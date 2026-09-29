/* eslint-disable @typescript-eslint/no-unused-vars */
import { buildOAuthUrl, type OAuthProvider } from '@/config/oauth'

export interface AuthUser {
  id: string
  phone: string
  name: string
  avatar?: string
  email?: string
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

export interface OAuthCallbackParams {
  code: string
  state: string
  provider: OAuthProvider
}

export const authApi = {
  login: (_params: LoginParams): Promise<LoginResult> => {
    throw new Error('Backend API not configured: POST /api/auth/login')
  },

  register: (_params: RegisterParams): Promise<LoginResult> => {
    throw new Error('Backend API not configured: POST /api/auth/register')
  },

  requestSmsCode: (_phone: string): Promise<{ message: string }> => {
    throw new Error('Backend API not configured: POST /api/auth/sms')
  },

  getOAuthUrl(provider: OAuthProvider): string | null {
    return buildOAuthUrl(provider)
  },

  exchangeOAuthCode: (_params: OAuthCallbackParams): Promise<LoginResult> => {
    throw new Error('Backend API not configured: POST /api/auth/oauth/callback')
  }
}
