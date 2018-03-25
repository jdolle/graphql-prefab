import axios from 'axios'

export interface HttpConfig extends ResolverConfig {
  use: "http",
  options?: {
    url?: string,
  }
}

const httpResolver = (options: HttpConfig['options']): ResolverFunction => {
  return (obj, args, context, info) => {
    if (options === undefined) {
      throw new Error('HTTP options are required')
    }

    if (options.url === undefined) {
      throw new Error('No url')
    }

    return axios(options.url)
  }
}

export default httpResolver
