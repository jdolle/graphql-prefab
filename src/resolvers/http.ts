import axios from 'axios'

export interface HttpConfig extends ResolverConfig {
  use: 'http',
  options?: {
    url?: string;
  }
}

const httpResolver = (options: HttpConfig['options']): ResolverFunction =>
  async (obj, args, context, info) => {
    if (options === undefined) {
      throw new Error('HTTP options are required')
    }

    if (options.url === undefined) {
      throw new Error('No url')
    }

    const { data } = await axios(options.url)

    return data
  }

export default httpResolver
