import shallow from './shallow'

export default (obj: any, value: any, path: (string | number)[]) => {
  const root: any = shallow(obj)
  let current: any = root
  let i: number

  for (i = 0; i < path.length - 1; i += 1) {
    const property = path[i]

    if (!current.hasOwnProperty(property)) {
      throw new Error(`Can't set path ${path.toString()} on ${obj.toString()}`)
    }
    current[property] = shallow(current[property] as any)
    current = current[property]
  }

  current[path[i]] = value as any

  return root
}
