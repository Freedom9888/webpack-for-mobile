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
import OAuthCallback from './pages/OAuthCallback'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Products from './pages/Products'
import ProductDetail from './pages/Products/Detail'
import Chat from './pages/Chat'
import Quiz from './pages/Quiz'

const authProviders = (children: React.ReactNode) => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)

const routes: RouteObject[] = [
  {
    path: '/',
    element: authProviders(<App />),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'invest', element: <Invest /> },
      { path: 'editor', element: <Editor /> },
      { path: 'demo1', element: <Demo1 /> }
    ]
  },
  {
    path: '/login',
    element: authProviders(<Login />)
  },
  {
    path: '/oauth/callback',
    element: authProviders(<OAuthCallback />)
  },
  {
    path: '/profile',
    element: authProviders(<Profile />)
  },
  {
    path: '/messages',
    element: authProviders(<Messages />)
  },
  {
    path: '/products',
    element: authProviders(<Products />)
  },
  {
    path: '/products/:id',
    element: authProviders(<ProductDetail />)
  },
  {
    path: '/chat',
    element: authProviders(<Chat />)
  },
  {
    path: '/quiz',
    element: authProviders(<Quiz />)
  }
]

const router = createBrowserRouter(routes)

export default router
