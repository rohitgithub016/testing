import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl='https://ipfs.io/ipfs/QmUGoWd9pC3BteB85BoCaMZAVJm8qc2wPYDBe2YsNWoK7R'>
    <App />

    </TonConnectUIProvider>
  </StrictMode>,
)
