export const env = {
  appTitle: process.env.APP_TITLE || '企业移动端',
  apiBaseUrl: process.env.APP_API_BASE_URL || '/api',
  enableMock: process.env.ENABLE_MOCK === 'true'
} as const

export default env
