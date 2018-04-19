export default interface PrefabResolver {
  name: string,
  resolve(obj: any, args: any, ctx: any, introspection: any): any
}
