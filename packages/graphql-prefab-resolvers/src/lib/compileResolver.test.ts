import Velocity from 'velocityjs'
import compileResolver from './compileResolver'
import { addResolver } from './resolversTable'

it('#compileResolver without any options', () => {
  const basicResolver = jest.fn().mockReturnValue('foo')
  const basicWrappedResolver = jest.fn().mockReturnValue(basicResolver)
  addResolver('basic', basicWrappedResolver)

  const config = {
    use: 'basic',
    options: {},
    parsedOptions: [],
  }
  const compiled = compileResolver(config)

  expect(compiled).toBeDefined()
  compiled(undefined, { foo: 'bar' }, { userId: 1 }, {})
  expect(basicWrappedResolver).toHaveBeenCalledWith({})
  expect(basicResolver).toHaveBeenCalledWith(undefined, { foo: 'bar' }, { userId: 1 }, {})
})

it('#compileResolver with parsed options', () => {
  const advancedResolver = jest.fn().mockReturnValue('foo')
  const advancedWrappedResolver = jest.fn().mockReturnValue(advancedResolver)
  addResolver('advanced', advancedWrappedResolver)

  const config = {
    use: 'advanced',
    options: {
      fancy: Velocity.parse('$args.foo'),
    },
    parsedOptions: [
      ['fancy'],
    ],
  }
  const compiled = compileResolver(config)

  expect(compiled).toBeDefined()
  compiled(undefined, { foo: 'bar' }, { userId: 1 }, {})
  expect(advancedWrappedResolver).toHaveBeenCalledWith({ fancy: 'bar' })
  expect(advancedResolver).toHaveBeenCalledWith(undefined, { foo: 'bar' }, { userId: 1 }, {})
})
