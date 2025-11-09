import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { VendorAuthProvider } from './context/VendorAuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <VendorAuthProvider>
        <CartProvider>
        <App />
      </CartProvider>
      </VendorAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
