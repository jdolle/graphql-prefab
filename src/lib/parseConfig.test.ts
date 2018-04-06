import path from 'path'
import parseConfig from './parseConfig'

it('#parseConfig takes in a valid config path and parses it', () => {
  const parsed = parseConfig(path.resolve(__dirname, '../../examples/demo-server/resolvers/Query.json'))
  expect(parsed).toMatchSnapshot()
})

it('#parseConfig throws on an invalid file path', () => {
  expect(() => parseConfig('./does_not_exist.json')).toThrow()
})
