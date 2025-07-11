import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RoleProvider from '../context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
    <App />
    </RoleProvider>
  </StrictMode>,
)
