import { Pool, QueryConfig } from 'pg'

export interface PGConfig extends ResolverConfig {
  use: 'postgres',
  options: {
    query: QueryConfig;
  }
}

let _client: Pool | undefined
const getClient = () => {
  if (_client === undefined) {
    _client = new Pool()
    _client.connect()
  }

  return _client
}

const pgResolver = (options: PGConfig['options']): ResolverFunction => {
  return async (obj, args, context, info) => {
    const { rows } = await getClient().query(options.query)

    return rows
  }
}

export default pgResolver
