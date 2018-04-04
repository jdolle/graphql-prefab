import { readFileSync } from 'fs'
import { mapObjIndexed } from 'ramda'
import Velocity from 'velocityjs'
import isString from './isString'

const parseResolver = (resolver: ResolverConfig): ParsedResolverConfig => {
  const parsedOptions: string[][] = []

  /**
   * Converts options to VELOCITY_AST[] to be compiled later.
   */
  const parseOptions = mapObjIndexed((value: any, key: string) => {
    if (isString(value)) {
      parsedOptions.push([key])

      return Velocity.parse(value)
    }

    return value
  })
  const options = parseOptions(resolver.options)

  return {
    use: resolver.use,
    options,
    parsedOptions,
  }
}

const parseFields = mapObjIndexed((resolvers: ResolverConfig[]) => resolvers.map(parseResolver))

/**
 * Reads and parses a resolver file.
 */
const parseConfig = (resolverFilePath: string): ParsedTypeConfig => {
  const json = readFileSync(resolverFilePath, { encoding: 'utf8' })
  const config: TypeConfig = JSON.parse(json.trim())

  return {
    typeName: config.typeName,
    fields: parseFields(config.fields),
  }
}

export default parseConfig
