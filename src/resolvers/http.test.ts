import moxios from 'moxios'
import httpResolver from './http'

it('#httpResolver throws if url is undefined', () => {
  expect(httpResolver()()).rejects.toMatchSnapshot()
  expect(httpResolver({})()).rejects.toMatchSnapshot()
})

it('#httpResolver calls axios', (done) => {
  moxios.withMock(() => {
    moxios.stubRequest('/example', {
      response: { data: ['foo'] },
    })
    httpResolver({ url: '/example' })()

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      expect(request.url).toBe('/example')
      done()
    })
  })
})
