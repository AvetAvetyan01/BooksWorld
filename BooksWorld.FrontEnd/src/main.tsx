import { createRoot } from 'react-dom/client'
import { StrictMode } from "react"
import App from './App.tsx'
import "./styles/index/index.scss"
import './config/i18n.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)