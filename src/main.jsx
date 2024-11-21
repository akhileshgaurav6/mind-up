import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './config/routes.jsx'
import { AuthProvider } from './context/authContext.jsx'



createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  
)
