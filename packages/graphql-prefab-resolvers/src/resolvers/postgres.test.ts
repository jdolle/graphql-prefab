import postgresResolver from './postgres'

jest.mock('pg', () => ({
  Pool: class {
    public connect = jest.fn().mockResolvedValue(this)
    public query = jest.fn().mockResolvedValue({ rows: [ 'bar' ] })
  },
}))

it('#postgresResolver throws if url is undefined', () => {
  expect(postgresResolver()()).rejects.toThrow()
})

it('#postgresResolver creates a Pool', () => {
  expect(postgresResolver({ query: { text: 'SELECT * FROM foo' } })()).resolves.toEqual([ 'bar' ])
})
