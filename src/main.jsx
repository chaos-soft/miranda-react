import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'

import router from './components/router'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode />
  </RouterProvider>
)
