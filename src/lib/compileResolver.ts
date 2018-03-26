import httpResolver from '../resolvers/http'
import compileOptions from './compileOptions'
import { getResolver } from './resolversTable'

/**
 * The resolver must compile the options AST at runtime to provide args and context
 *
 * This wraps the real resolver with a step to compile the options AST
 */
const optionsCompilerResolver = (resolver: OptionedResolverFunction, options: ResolverConfig['options']) => {
  const wrapper: ResolverFunction = (obj, args, context, info) => {
    const compiledOptions = compileOptions(options, { obj, args, context, info, env: process.env })

    return resolver(compiledOptions)
  }

  return wrapper
}

/**
 * Compiles a resolver from a config
 * TODO allow adding custom resolvers
 */
const compileResolver = (resolverConfig: ResolverConfig): ResolverFunction => {
  const resolver = getResolver(resolverConfig.use)

  if (resolver === undefined) {
    throw new Error(`Unsupported resolver: ${resolverConfig.use}`)
  }

  return optionsCompilerResolver(httpResolver, resolverConfig.options)
}

export default compileResolver
