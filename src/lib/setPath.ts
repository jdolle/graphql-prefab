export default (obj: any, value: any, path: (string | number)[]) => {
  let current: any = obj
  let i: number

  for (i = 0; i < path.length - 1; i += 1) {
    if (!current.hasOwnProperty(path[i])) {
      throw new Error(`Can't set path ${path.toString()} on ${obj.toString()}`)
    }
    current = current[path[i]] as any
  }

  obj[path[i]] = value as any

  return obj
}
