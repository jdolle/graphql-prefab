import { Pool, QueryConfig } from 'pg'
import firstDefined from '../lib/firstDefined'

export interface PGConfig extends ResolverConfig {
  use: 'postgres',
  options?: {
    query?: QueryConfig;
  }
}

let _client: Pool | undefined
const getClient = async () => {
  if (_client === undefined) {
    _client = new Pool({
      user: firstDefined(process.env.PGUSER, process.env.DATABASE_USERNAME, 'admin'),
      host: firstDefined(process.env.PGHOST, process.env.DATABASE_HOST, 'localhost'),
      database: firstDefined(process.env.PGDATABASE, process.env.DATABASE_NAME, 'database'),
      password: firstDefined(process.env.PGPASSWORD, process.env.DATABASE_PASSWORD, 'password'),
      port: parseInt(firstDefined(process.env.PGPORT, process.env.DATABASE_PORT, '5432'), 10),
    })
    await _client.connect()
  }

  return _client
}

const pgResolver = (options?: PGConfig['options']): ResolverFunction => {
  return async (obj, args, context, info) => {
    if (options === undefined || options.query === undefined) {
      throw new Error(`'query' option required`)
    }

    const client = await getClient()
    const { rows } = await client.query(options.query)

    return rows
  }
}

export default pgResolver
