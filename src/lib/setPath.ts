export default (obj: any, value: any, path: string[]) => {
  let current = obj
  let i: number

  for (i = 0; i < path.length - 1; i += 1) {
    current = current[path[i]]
  }

  obj[path[i]] = value
}
