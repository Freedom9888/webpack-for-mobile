export interface AuthUser {
  id: string
  phone: string
  name: string
  avatar?: string
}

export interface LoginResult {
  token: string
  user: AuthUser
}

export interface RegisterParams {
  phone: string
  smsCode: string
  password: string
}

export interface LoginParams {
  phone: string
  password: string
}

function mockDelay<T>(data: T, ms = 800): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), ms))
}

export const authApi = {
  login: (params: LoginParams): Promise<LoginResult> => {
    return mockDelay({
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        phone: params.phone,
        name: '用户' + params.phone.slice(-4)
      }
    })
  },

  register: (params: RegisterParams): Promise<LoginResult> => {
    return mockDelay({
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '2',
        phone: params.phone,
        name: '用户' + params.phone.slice(-4)
      }
    })
  },

  requestSmsCode: (phone: string): Promise<{ message: string }> => {
    return mockDelay({ message: '验证码已发送到 ' + phone })
  },

  socialLogin: (provider: string): Promise<LoginResult> => {
    return mockDelay({
      token: 'mock-jwt-token-' + provider + '-' + Date.now(),
      user: {
        id: '3',
        phone: '',
        name: provider + '用户',
        avatar: undefined
      }
    })
  }
}
