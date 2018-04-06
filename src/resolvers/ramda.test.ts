import ramdaResolver from './ramda'

it('#ramdaResolver throws if fn is undefined', () => {
  expect(() => ramdaResolver()()).toThrow()
  expect(() => ramdaResolver({ args: [] })()).toThrow()
})

it('#ramdaResolver throws if fn is not a ramda function', () => {
  expect(() => ramdaResolver({ path: 'not_in_ramda' } as any)()).toThrow()
})

it('#ramdaResolver path', () => {
  expect(ramdaResolver({ fn: 'path', args: [['foo']]})({ foo: 'bar'})).toEqual('bar')
})

it('#ramdaResolver passes the obj as the first argument if none are defined', () => {
  expect(ramdaResolver({ fn: 'identity' })({ foo: 'bar'})).toEqual({ foo: 'bar' })
})
