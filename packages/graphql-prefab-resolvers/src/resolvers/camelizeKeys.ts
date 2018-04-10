import { camelizeKeys } from 'humps'

export interface CamelizeKeysConfig extends ResolverConfig {
  use: 'camelizeKeys',
}

const camelizeKeysResolver = (): ResolverFunction =>
  (obj, args, context, info) =>
    camelizeKeys(obj)

export default camelizeKeysResolver
