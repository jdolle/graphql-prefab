type OptionValue = string | number | boolean | VELOCITY_AST[] | undefined

interface Hash {
  [key: string]: OptionValue,
}

type ResolverConfig = {
  use: string,
  options?: Hash,
}

type TypeConfig = {
  type?: string,
  fields: {
    [fieldName: string]: ResolverConfig[],
  }
}

type ResolverFunction = (root?: any, args?: Hash, context?: any, info?: any) => any

type OptionedResolverFunction = (options: ResolverConfig['options']) => ResolverFunction
