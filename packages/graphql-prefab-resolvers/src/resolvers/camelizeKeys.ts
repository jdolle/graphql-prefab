import { camelizeKeys } from 'humps'
import PrefabResolver from './PrefabResolver'

export interface CamelizeKeysConfig extends ResolverConfig {
  use: 'camelizeKeys',
}

class CamelizeKeysResolver implements PrefabResolver {
  public name = 'camelizeKeys'
  // todo cfg
  public resolve(obj: any, args: any, context: any, info: any) {
    return camelizeKeys(obj)
  }
}

const camelizeKeysResolver = (): ResolverFunction =>
  (obj, args, context, info) =>
    camelizeKeys(obj)

export default CamelizeKeysResolver
