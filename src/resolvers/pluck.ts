import { pathOr } from 'ramda'

export interface PluckConfig extends ResolverConfig {
  use: 'pluck',
  options?: {
    path?: string;
  }
}

const pluckResolver = (options: PluckConfig['options']): ResolverFunction =>
  (obj, args, context, info) => {
    if (options === undefined || options.path === undefined) {
      throw new Error('Bad configuration')
    }

    return pathOr(undefined, [options.path], obj)
  }

export default pluckResolver
