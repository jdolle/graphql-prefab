import { getResolver } from './resolversTable'
import Velocity from 'velocityjs'
import { path } from 'ramda'

import setPath from './setPath'

const compileOptions = (options: ParsedResolverConfig['options'], parsedOptions: ParsedResolverConfig['parsedOptions'], context?: {}) => {
  const compiledOptions = {
    ...options,
  }

  parsedOptions.forEach(
    (parsedPath) => {
      const value = path(parsedPath, options) as VELOCITY_AST[]
      const compiled = (new Velocity.Compile(value)).render(context)
      setPath(compiledOptions, compiled, parsedPath)
    },
  )

  return compiledOptions
}

/**
 * Compiles a resolver from a config
 */
const compileResolver = (resolverConfig: ParsedResolverConfig): ResolverFunction => {
  const resolver = getResolver(resolverConfig.use)

  if (resolver === undefined) {
    throw new Error(`Unsupported resolver: ${resolverConfig.use}`)
  }

  // Wrap the real resolver with a step which compiles the options AST
  // The resolver compiles the options AST at runtime to provide args and context
  return async (obj, args, context, info) => {
    const compiledOptions = compileOptions(
      resolverConfig.options,
      resolverConfig.parsedOptions,
      { obj, args, context, info, env: process.env },
    )
    const resolveFn = resolver(compiledOptions)

    return resolveFn(obj, args, context, info)
  }
}

export default compileResolver
