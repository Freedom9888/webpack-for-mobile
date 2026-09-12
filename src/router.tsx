import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import ThemeProvider from './components/ThemeProvider'
import { AuthProvider } from './components/AuthProvider'
import { queryClient } from './config/queryClient'
import Home from './pages/Home'
import About from './pages/About'
import Invest from './pages/Invest'
import Editor from './pages/Editor'
import Demo1 from './pages/demo1'
import Login from './pages/Login'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'invest',
        element: <Invest />
      },
      {
        path: 'editor',
        element: <Editor />
      },
      {
        path: 'demo1',
        element: <Demo1 />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AuthProvider>
              <Login />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    )
  }
]

const router = createBrowserRouter(routes)

export default router
