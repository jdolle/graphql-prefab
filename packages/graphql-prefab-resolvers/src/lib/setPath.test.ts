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

it('setPath sets nested paths that exists', () => {
  expect(setPath({ foo: { bar: 'old' } }, 'new', ['foo', 'bar'])).toEqual({ foo: { bar: 'new' } })
})

it('setPath sets array paths that exists', () => {
  expect(setPath({ foo: { bar: ['old'] } }, 'new', ['foo', 'bar', 0])).toEqual({ foo: { bar: ['new'] } })
})

it('setPath does not modify the original object', () => {
  const obj = { foo: { bar: ['old'] } }

  setPath(obj, 'new', ['foo', 'bar', 0])
  expect(obj).toEqual({ foo: { bar: ['old'] } })
})
