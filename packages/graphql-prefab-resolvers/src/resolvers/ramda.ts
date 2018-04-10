import R from 'ramda'

export interface RamdaConfig extends ResolverConfig {
  use: 'ramda',
  options: {
    fn?: keyof R.Static;
    args?: any[];
  }
}

const ramdaResolver = (options?: RamdaConfig['options']): ResolverFunction => {
  return (obj, args, context, info) => {
    if (options === undefined || options.fn === undefined || R[options.fn] === undefined) {
      throw new Error('Bad configuration')
    }
    const fnArgs = options.args === undefined ? [obj] : options.args

    return (R as any)[options.fn](...fnArgs, obj)
  }
}

export default ramdaResolver
