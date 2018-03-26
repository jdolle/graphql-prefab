import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import path from 'path'

import { compile } from '../../src/index'

const typeDefs = importSchema(path.resolve(__dirname, 'types/Query.graphql'))
const resolvers = compile(path.resolve(__dirname, './resolvers'))
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on localhost:4000'))
