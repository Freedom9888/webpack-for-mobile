import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import ThemeProvider from './components/ThemeProvider'
import Home from './pages/Home'
import About from './pages/About'
import Invest from './pages/Invest'
import Editor from './pages/Editor'
import Demo1 from './pages/demo1'

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
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
  }
]

const router = createBrowserRouter(routes)

export default router
