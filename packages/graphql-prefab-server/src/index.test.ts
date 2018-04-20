import { GraphQLServer, PubSub as mockGraphQLServerStart } from 'graphql-yoga'
import { compile } from 'graphql-prefab-resolvers'
import { importSchema } from 'graphql-import'
import start from './index'

jest.mock('graphql-yoga', () => {
  const mockStart = jest.fn().mockImplementation((config, cb) => cb())

  return {
    PubSub: mockStart, // hacky workaround for typescript and mock exports
    GraphQLServer: jest.fn().mockImplementation(() => ({
      start: mockStart,
      express: {
        get: jest.fn(),
      },
    })),
  }
})

jest.mock('graphql-import', () => ({
  importSchema: jest.fn().mockReturnValue({}),
}))

jest.mock('graphql-prefab-resolvers', () => ({
  compile: jest.fn().mockReturnValue({}),
}))

beforeEach(() => {
  (GraphQLServer as jest.Mock<GraphQLServer>).mockClear()
})

it('imports', async () => {
  await start()
  expect(importSchema).toHaveBeenCalled()
})

it('compiles', async () => {
  await start()
  expect(compile).toHaveBeenCalled()
})

it('constructs a graphql-yoga server and starts it', async () => {
  await start()
  expect(GraphQLServer).toHaveBeenCalled()
  expect(mockGraphQLServerStart as any).toHaveBeenCalled()
})
