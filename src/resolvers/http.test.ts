import axios from 'axios'
import httpResolver from './http'

jest.mock('axios', () => jest.fn().mockResolvedValue({ data: {}}))

it('#httpResolver throws if url is undefined', () => {
  expect(() => httpResolver()()).toThrow()
  expect(() => httpResolver({})()).toThrow()
})

it('#httpResolver calls axios', () => {
  httpResolver({ url: '/example' })()

  expect(axios).toHaveBeenCalledWith({ url: '/example' })
})
