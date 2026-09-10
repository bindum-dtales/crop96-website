import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

/**
 * Home ships in the entry chunk; the rest split out and load on navigation.
 * Route-level `lazy` (rather than React.lazy + Suspense) holds the navigation
 * until the chunk is in, so the layout's scroll-reveal pass runs against the
 * real page rather than a fallback.
 */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
})

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', lazy: page(() => import('./pages/Services')) },
      { path: '/products', lazy: page(() => import('./pages/Products')) },
      { path: '/about', lazy: page(() => import('./pages/About')) },
      { path: '/contact', lazy: page(() => import('./pages/Contact')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
