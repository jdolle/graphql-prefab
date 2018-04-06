import shallow from './shallow'

it('#shallow creates a shallow copy', () => {
  expect(shallow({})).toEqual({})
  expect(shallow({})).not.toBe({})
  expect(shallow([])).toEqual([])
  expect(shallow([])).not.toBe([])
  expect(shallow(true)).toBe(true)
})
