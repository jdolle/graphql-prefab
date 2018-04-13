import firstDefined from './firstDefined'

it('finds first defined argument', () => {
  expect(firstDefined(undefined, 1, 2)).toBe(1)
})
