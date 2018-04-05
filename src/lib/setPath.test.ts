import setPath from './setPath'

it('setPath throws when trying to set a path that doesnt exist', () => {
  const setInvalidPath = () => {
    setPath({}, 'test', ['foo', 'bar'])
  }
  expect(setInvalidPath).toThrowErrorMatchingSnapshot()
})

it('setPath sets a path that exists', () => {
  expect(setPath({ foo: { bar: 'old' } }, 'new', ['foo'])).toEqual({ foo: 'new' })
})
