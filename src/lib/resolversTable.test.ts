import { getResolver, addResolver } from './resolversTable'

it('can add then get a resolver', () => {
  const fooResolver = () => () => 'foo'

  expect(getResolver('foo')).toBeUndefined()
  addResolver('foo', fooResolver)
  expect(getResolver('foo')).toBe(fooResolver)
})
