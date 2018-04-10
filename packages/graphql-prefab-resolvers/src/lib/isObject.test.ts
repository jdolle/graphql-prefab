import isObject from './isObject'

it('#isObject is true for Objects', () => {
  expect(isObject({})).toBe(true)
  expect(isObject(new Object())).toBe(true)
})

it('#isObject is false for non-Objects', () => {
  expect(isObject([])).toBe(false)
  expect(isObject('foo')).toBe(false)
})
