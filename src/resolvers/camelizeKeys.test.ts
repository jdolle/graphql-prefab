import camelizeKeysResolver from './camelizeKeys'

it('#camelizeKeysResolver undefined', () => {
  expect(camelizeKeysResolver()()).toBeUndefined()
})

it('#camelizeKeysResolver camelizes the resolver obj', () => {
  expect(camelizeKeysResolver()({ foo_key: 'bar' })).toEqual({ fooKey: 'bar' })
})
