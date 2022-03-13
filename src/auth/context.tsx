import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {AuthForm} from './auth-form'

export interface AuthContext {
  token: string | null
  setToken: (token: string) => void
  clear: () => void
}

const KEY = 'coordinape-auth-token'

export const AuthContext = createContext<AuthContext>(
  undefined as unknown as AuthContext,
)

export const Authenticate = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(null)
  const isAuthenticated = !!token

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(KEY)
      setToken(token)
    }
  }, [])

  const value = {
    token,
    setToken: (token: string) => {
      localStorage.setItem(KEY, token)
      setToken(token)
    },
    clear: () => {
      localStorage.removeItem(KEY)
      setToken(null)
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {isAuthenticated ? children : <AuthForm />}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
