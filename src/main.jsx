import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import DrumMachine from './DrumMachine.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DrumMachine/>
  </StrictMode>,
)
