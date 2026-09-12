import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <div>Home Page</div>,
      },
      {
        path: 'about',
        element: <div>About Page</div>,
      },
      {
        path: 'invest',
        element: <div>Invest Page</div>,
      },
      {
        path: 'editor',
        element: <div>Editor Page</div>,
      },
      {
        path: 'demo1',
        element: <div>Demo 1 Page</div>,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
