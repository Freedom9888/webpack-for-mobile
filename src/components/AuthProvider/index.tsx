import React, { useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  authApi,
  type AuthUser,
  type LoginParams,
  type RegisterParams,
  type OAuthCallbackParams
} from '@/api/auth'
import { AuthContext } from './context'
import type { OAuthProvider } from '@/config/oauth'

export interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (params: LoginParams) => Promise<void>
  register: (params: RegisterParams) => Promise<void>
  socialLogin: (provider: OAuthProvider) => void
  handleOAuthCallback: (params: OAuthCallbackParams) => Promise<void>
  logout: () => void
  requestSmsCode: (phone: string) => Promise<void>
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  const login = useCallback(async (params: LoginParams) => {
    const result = await authApi.login(params)
    setToken(result.token)
    setUser(result.user)
  }, [])

  const register = useCallback(async (params: RegisterParams) => {
    const result = await authApi.register(params)
    setToken(result.token)
    setUser(result.user)
  }, [])

  const socialLogin = useCallback((provider: OAuthProvider) => {
    const url = authApi.getOAuthUrl(provider)
    if (!url) {
      throw new Error(`OAuth not configured for ${provider}`)
    }
    sessionStorage.setItem('oauth_provider', provider)
    const urlObj = new URL(url)
    const state = urlObj.searchParams.get('state')
    if (state) {
      sessionStorage.setItem('oauth_state', state)
    }
    window.location.href = url
  }, [])

  const handleOAuthCallback = useCallback(async (params: OAuthCallbackParams) => {
    const result = await authApi.exchangeOAuthCode(params)
    setToken(result.token)
    setUser(result.user)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  const requestSmsCode = useCallback(async (phone: string) => {
    await authApi.requestSmsCode(phone)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        socialLogin,
        handleOAuthCallback,
        logout,
        requestSmsCode
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
