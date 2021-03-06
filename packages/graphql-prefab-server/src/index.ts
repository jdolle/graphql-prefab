import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { compile } from 'graphql-prefab-resolvers'
import path from 'path'

const PREFAB_GQL_PORT = process.env.PREFAB_GQL_PORT === undefined ?
  '4000' : process.env.PREFAB_GQL_PORT

const PREFAB_GQL_ENDPOINT = process.env.PREFAB_GQL_ENDPOINT === undefined ?
  '/' : process.env.PREFAB_GQL_ENDPOINT

const PREFAB_SCHEMA_PATH = process.env.PREFAB_SCHEMA_PATH === undefined ?
  './types/Query.graphql' : process.env.PREFAB_SCHEMA_PATH

const PREFAB_RESOLVERS_PATH = process.env.PREFAB_RESOLVERS_PATH === undefined ?
  './resolvers' : process.env.PREFAB_RESOLVERS_PATH

const PREFAB_DISABLE_PLAYGROUND = process.env.PREFAB_DISABLE_PLAYGROUND === undefined ?
  false : (process.env.PREFAB_DISABLE_PLAYGROUND === 'true') || (parseInt(process.env.PREFAB_DISABLE_PLAYGROUND, 10) === 1)

const start = async () => {
  const typeDefs = importSchema(path.resolve(PREFAB_SCHEMA_PATH))
  const resolvers = compile(path.resolve(PREFAB_RESOLVERS_PATH))
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
  })

  server.express.get('/health', (req, res) => {
    res.send('OK')
  })

  const playground = PREFAB_DISABLE_PLAYGROUND ? false : PREFAB_GQL_ENDPOINT
  const options = {
    endpoint: PREFAB_GQL_ENDPOINT,
    subscriptions: PREFAB_GQL_ENDPOINT,
    playground: playground as string | false, // tslint:disable-line:no-unnecessary-type-assertion
    port: PREFAB_GQL_PORT,
  }
  await server.start(options, () => {
    console.log(`
======================================================
    GraphQL-Prefab is running on port ${PREFAB_GQL_PORT}

    GraphQL:  ${PREFAB_GQL_ENDPOINT}
    GraphiQL: ${playground}
======================================================
    `)
  })
}

process.on('uncaughtException', (err) => {
  console.error((err !== undefined && err.stack !== undefined) ? err.stack : err)
})

export default start
