import Velocity from 'velocityjs'
import { mapObjIndexed } from 'ramda'

const compileOptions = (options?: ResolverConfig['options'], context?: {}) =>
  mapObjIndexed((value: OptionValue) => {
    if (Array.isArray(value)) {
      (new Velocity.Compile(value)).render(context)
    }
    return value
  }, options)

export default compileOptions
