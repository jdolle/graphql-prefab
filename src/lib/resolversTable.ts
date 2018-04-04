import camelizeKeysResolver from '../resolvers/camelizeKeys'
import httpResolver from '../resolvers/http'
import ramdaResolver from '../resolvers/ramda'

interface ResolversTable {
  [key: string]: OptionedResolverFunction,
}

const resolvers: ResolversTable = {}

export const addResolver = (key: string, fn: OptionedResolverFunction) => resolvers[key] = fn

export const getResolver = (key: string) => resolvers[key]

addResolver('camelizeKeys', camelizeKeysResolver)
addResolver('http', httpResolver)
addResolver('ramda', ramdaResolver)
