import compileOptions from './compileOptions'
import { getResolver } from './resolversTable'

/**
 * The resolver must compile the options AST at runtime to provide args and context
 *
 * This wraps the real resolver with a step to compile the options AST
 */
const optionsCompilerResolver = (resolver: OptionedResolverFunction, options: ResolverConfig['options'] = {}): ResolverFunction =>
  async (obj, args, context, info) => {
    const compiledOptions = compileOptions(options, { obj, args, context, info, env: process.env })
    const resolveFn = resolver(compiledOptions)

    return resolveFn(obj, args, context, info)
  }

/**
 * Compiles a resolver from a config
 */
const compileResolver = (resolverConfig: ResolverConfig): ResolverFunction => {
  const resolver = getResolver(resolverConfig.use)

  if (resolver === undefined) {
    throw new Error(`Unsupported resolver: ${resolverConfig.use}`)
  }

  return optionsCompilerResolver(resolver, resolverConfig.options)
}

export default compileResolver
