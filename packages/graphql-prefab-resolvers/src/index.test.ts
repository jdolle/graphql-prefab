import { compile } from './index'

jest.mock('./lib/readResolversDir', () =>
  jest.fn().mockReturnValue([ './example' ]),
)

jest.mock('./lib/parseConfig', () =>
  jest.fn().mockReturnValue({ typeName: 'foo', fields: {} }),
)

it('#compile', () => {
  expect(compile()).toMatchSnapshot()
})
