interface ResolverConfig {
  use: string,
  options: any,
}

interface ParsedResolverConfig extends ResolverConfig {
  options: {
    [key: string]: any;
  },
  parsedOptions: (string | number)[][],
}

interface TypeConfig {
  typeName?: string,
  fields: {
    [fieldName: string]: ResolverConfig[];
  }
}

interface ParsedTypeConfig {
  typeName?: string,
  fields: {
    [fieldName: string]: ParsedResolverConfig[];
  }
}

type ResolverFunction = (root?: any, args?: any, context?: any, info?: any) => any

type OptionedResolverFunction = (options: ResolverConfig['options']) => ResolverFunction
