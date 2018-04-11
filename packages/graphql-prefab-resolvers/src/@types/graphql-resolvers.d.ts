declare module 'graphql-resolvers' {
  type ResolverFunction = (root: any, args: any, context: any) => any

  const out: {
    pipeResolvers(
      ...resolvers: ResolverFunction[],
    ): ResolverFunction;

    combineResolvers(
      ...resolvers: ResolverFunction[],
    ): ResolverFunction;
  }

  export = out
}
