import path from 'path'
import readResolversDir from './readResolversDir'

it('#readResolversDir gets all json files in the directory', () => {
  const dirPath = path.resolve(__dirname, '../../examples/demo-server/src/resolvers')
  const resolverPaths = readResolversDir(dirPath)
  const relativePathArray = resolverPaths.map(p => path.relative(dirPath, p))

  expect(relativePathArray).toMatchSnapshot()
})

it('#readResolversDir throws on an invalid path', () => {
  expect(() => readResolversDir('./does_not_exist')).toThrow()
})
