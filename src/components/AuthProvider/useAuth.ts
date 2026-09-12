import { useContext } from 'react'
import { AuthContext } from './context'
import type { AuthContextType } from './index'

export const useAuth = () => {
  const context = useContext(AuthContext as React.Context<AuthContextType>)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
