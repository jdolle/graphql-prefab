import moxios from 'moxios'
import httpResolver from './http'

it('#httpResolver throws if url is undefined', () => {
  expect(httpResolver()()).rejects.toMatchSnapshot()
  expect(httpResolver({})()).rejects.toMatchSnapshot()
})

it('#httpResolver calls axios', (done) => {
  moxios.withMock(() => {
    const result = httpResolver({ url: '/example' })()

    moxios.wait(async () => {
      const request = moxios.requests.mostRecent()
      await request.respondWith({ response: ['foo'] })
      expect(request.url).toBe('/example')
      expect(result).resolves.toEqual(['foo'])
      done()
    })
  })
})
