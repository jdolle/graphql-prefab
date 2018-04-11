import { readFileSync } from 'fs'
import { mapObjIndexed } from 'ramda'
import Velocity from 'velocityjs'
import isString from './isString'
import isObject from './isObject'

/**
 * Converts options to VELOCITY_AST[] to be compiled later.
 * @arg value object, array, or primitive that is being parsed
 * @arg path current path of the value within the initial parsed value
 * @arg outPaths an array that each velocity parsed value pushes its path on to
 */
const parseOptions = (value: any, path: (string | number)[], outPaths: (string | number)[][]): any => {
  if (isObject(value)) {
    return mapObjIndexed((x: any, key: string) =>
      parseOptions(x, [...path, key], outPaths),
    )(value)
  } else if (Array.isArray(value)) {
    return value.map((x: any, index: number) =>
      parseOptions(x, [...path, index], outPaths),
    )
  } else if (isString(value)) {
    outPaths.push(path)

    return Velocity.parse(value)
  }

  return value
}

const parseResolver = (resolver: ResolverConfig): ParsedResolverConfig => {
  const parsedOptions: (string | number)[][] = []

  const options = parseOptions(resolver.options, [], parsedOptions)

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
