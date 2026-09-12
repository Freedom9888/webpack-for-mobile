import { createContext } from 'react'
import type { AuthContextType } from './index'

export const AuthContext = createContext<AuthContextType | null>(null)
