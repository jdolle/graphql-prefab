type OptionValue = string | number | boolean | VELOCITY_AST[] | any | undefined

interface Hash {
  [key: string]: OptionValue,
}

interface ResolverConfig {
  use: string,
  options?: Hash,
}

interface TypeConfig {
  typeName?: string,
  fields: {
    [fieldName: string]: ResolverConfig[];
  }
}

type ResolverFunction = (root?: any, args?: Hash, context?: any, info?: any) => any

type OptionedResolverFunction = (options: ResolverConfig['options']) => ResolverFunction
