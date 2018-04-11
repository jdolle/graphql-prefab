import { is } from 'ramda'

export default (value: any): value is string => is(String, value)
