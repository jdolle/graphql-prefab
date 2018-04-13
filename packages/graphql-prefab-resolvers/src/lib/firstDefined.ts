import { find } from 'ramda'

const isDefined = (a: any) => a !== undefined

export default (...args: any[]) => find(isDefined, args)
