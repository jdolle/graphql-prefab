import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { compile } from 'graphql-prefab-resolvers'
import path from 'path'

const start = async () => {
  const typeDefs = importSchema(path.resolve(__dirname, 'types/Query.graphql'))
  const resolvers = compile(path.resolve(__dirname, './resolvers'))
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
  })

  await server.start(() => {
    console.log('Server is running on localhost:4000')
  })
}

export default start
