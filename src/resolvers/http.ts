import axios, { AxiosRequestConfig } from 'axios'

export interface HttpConfig extends ResolverConfig {
  use: 'http',
  options: {
    method: AxiosRequestConfig['method'];
    responseType: AxiosRequestConfig['responseType'];
    url: AxiosRequestConfig['url'];
    headers?: AxiosRequestConfig['headers'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    timeout: AxiosRequestConfig['timeout'];
    baseURL: AxiosRequestConfig['baseURL'];
    withCredentials: AxiosRequestConfig['withCredentials'];
    proxy: AxiosRequestConfig['proxy'];
    maxRedirects: AxiosRequestConfig['maxRedirects'];
    maxContentLength: AxiosRequestConfig['maxContentLength'];
    xsrfCookieName: AxiosRequestConfig['xsrfCookieName'];
    xsrfHeaderName: AxiosRequestConfig['xsrfHeaderName'];
  }
}

// ### Missing Axios config fields
//
// transformRequest?: AxiosTransformer | AxiosTransformer[];
// transformResponse?: AxiosTransformer | AxiosTransformer[];
// paramsSerializer?: (params: any) => string;
// adapter?: AxiosAdapter;
// auth?: AxiosBasicCredentials;
// onUploadProgress?: (progressEvent: any) => void;
// onDownloadProgress?: (progressEvent: any) => void;
// validateStatus?: (status: number) => boolean;
// httpAgent?: any;
// httpsAgent?: any;
// cancelToken?: CancelToken;

const httpResolver = (options: HttpConfig['options']): ResolverFunction => {
  if (options === undefined) {
    throw new Error('HTTP options are required')
  }

  if (options.url === undefined) {
    throw new Error('No url')
  }

  return async (obj, args, context, info) => {
    const { data } = await axios(options)

    return data
  }
}

export default httpResolver
