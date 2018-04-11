import isObject from './isObject'

export default (x: any) => {
  if (isObject(x)) {
    return {
      ...x,
    }
  } else if (Array.isArray(x)) {
    return [ ...x ]
  }

  return x
}
