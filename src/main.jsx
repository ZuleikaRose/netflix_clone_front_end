import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './index.css'
import App from './App.jsx'
import { completeDownloads } from './data/downloads.js'
import { registerServiceWorker } from './lib/pwa.js'
import { AccessibilityProvider } from './state/AccessibilityProvider.jsx'
import { AuthProvider } from './state/AuthProvider.jsx'
import { CatalogProvider } from './state/CatalogProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <AuthProvider>
          <AccessibilityProvider>
            <App />
          </AccessibilityProvider>
        </AuthProvider>
      </CatalogProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Speed Insights' script is served only on Vercel (/_vercel/...), so only production builds load it; the e2e builds
// (--mode development) would get index.html back and report a script error
if (import.meta.env.MODE === 'production') injectSpeedInsights()
registerServiceWorker()
completeDownloads()
window.addEventListener('online', completeDownloads)
