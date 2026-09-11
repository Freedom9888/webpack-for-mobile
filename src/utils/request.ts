type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string }
type ResponseInterceptor = (response: Response) => Response

const BASE_URL = '/api'

const requestInterceptors: RequestInterceptor[] = []
const responseInterceptors: ResponseInterceptor[] = []

export function addRequestInterceptor(interceptor: RequestInterceptor): void {
  requestInterceptors.push(interceptor)
}

export function addResponseInterceptor(interceptor: ResponseInterceptor): void {
  responseInterceptors.push(interceptor)
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | string | FormData
  params?: Record<string, string>
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, params, headers: customHeaders, ...rest } = options

  let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    fullUrl += `?${searchParams.toString()}`
  }

  const isFormData = body instanceof FormData
  const defaultHeaders: Record<string, string> = isFormData
    ? {}
    : { 'Content-Type': 'application/json' }

  let config: RequestInit & { url: string } = {
    url: fullUrl,
    headers: { ...defaultHeaders, ...customHeaders },
    ...rest
  }

  if (body && !isFormData) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body)
  } else if (isFormData) {
    config.body = body
  }

  for (const interceptor of requestInterceptors) {
    config = interceptor(config)
  }

  const { url: finalUrl, ...fetchOptions } = config
  const response = await fetch(finalUrl, fetchOptions)

  let finalResponse = response
  for (const interceptor of responseInterceptors) {
    finalResponse = interceptor(finalResponse)
  }

  if (!finalResponse.ok) {
    const errorBody = await finalResponse.text().catch(() => '')
    throw new Error(
      `HTTP ${finalResponse.status}: ${finalResponse.statusText}${errorBody ? ` - ${errorBody}` : ''}`
    )
  }

  const contentType = finalResponse.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return finalResponse.json() as Promise<T>
  }

  return finalResponse.text() as unknown as T
}

export const http = {
  get: <T>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body?: Record<string, unknown>, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'POST', body }),

  put: <T>(url: string, body?: Record<string, unknown>, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'PUT', body }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' })
}

export default http
