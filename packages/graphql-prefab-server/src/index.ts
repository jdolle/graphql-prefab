import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { compile } from 'graphql-prefab-resolvers'
import path from 'path'

const PREFAB_SCHEMA_PATH = process.env.PREFAB_SCHEMA_PATH || './types/Query.graphql'
const PREFAB_RESOLVERS_PATH = process.env.PREFAB_RESOLVERS_PATH || './resolvers'

const start = async () => {
  const typeDefs = importSchema(path.resolve(PREFAB_SCHEMA_PATH))
  const resolvers = compile(path.resolve(PREFAB_RESOLVERS_PATH))
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
  })

  await server.start(() => {
    console.log('Server is running on localhost:4000')
  })
}

process.on('uncaughtException', (err) => {
  console.error((err && err.stack) ? err.stack : err)
})

export default start
