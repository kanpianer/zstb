import React from 'react'
import ReactDOM from 'react-dom/client'
import { SiteRoot } from './cms/SiteRoot'
import './index.css'
import { registerServiceWorker } from './registerSW'

// Initialize Service Worker & Persistent Cache for fonts and static assets
registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiteRoot />
  </React.StrictMode>,
)
