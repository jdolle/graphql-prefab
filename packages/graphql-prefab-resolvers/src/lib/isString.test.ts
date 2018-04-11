import isString from './isString'

it('#isString is false for non-strings', () => {
  expect(isString({})).toBe(false)
  expect(isString([])).toBe(false)
  expect(isString(new (class Test {})())).toBe(false)
})

it('#isString is true for strings', () => {
  expect(isString('foo')).toBe(true)
})
