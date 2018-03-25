import { readFileSync } from 'fs'
import { mapObjIndexed } from 'ramda'
import Velocity from 'velocityjs'
import isString from './isString'

/**
 * Converts options to VELOCITY_AST[] to be compiled later.
 */
const parseOptions = mapObjIndexed((value: string | number | boolean) => {
  if (isString(value)) {
    return Velocity.parse(value)
  }

  return value
})

const parseResolver = (resolver: ResolverConfig) => {
  if (resolver.options !== undefined) {
    resolver.options = parseOptions(resolver.options)
  }
  return resolver
}

const parseFields = mapObjIndexed((resolvers: ResolverConfig[]) => resolvers.map(parseResolver))

/**
 * Reads and parses a resolver file.
 */
const parseConfig = (resolverFilePath: string) => {
  const json = readFileSync(resolverFilePath, { encoding: 'utf8' })
  const config: TypeConfig = JSON.parse(json.trim())

  config.fields = parseFields(config.fields)

  return config
}

export default parseConfig
