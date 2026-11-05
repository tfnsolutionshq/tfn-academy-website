import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sora'
import '@fontsource-variable/figtree'
import './styles/globals.css'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
