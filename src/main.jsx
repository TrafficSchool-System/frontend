import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Lägg till denna rad
import './index.css'
import './styles/globals.css'
import App from './app/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Lägg till denna rad */}
      <App />
    </BrowserRouter> {/* Och denna */}
  </StrictMode>,
)