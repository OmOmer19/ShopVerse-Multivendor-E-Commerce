import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import VendorDetails from './pages/VendorDetails'
import Cart from './pages/Cart'
import VendorPage from './pages/VendorPage'
import VendorLogin from './components/VendorLogin'
import UserSignIn from './components/UserSignIn'
import RoleSelection from './components/RoleSelection'
import Checkout from './components/CheckoutPage'
import UserOrders from './components/UserOrders'


function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className='flex-grow'>
        <Routes>
          
          <Route path='/' element={<RoleSelection />} />

          <Route path='/user-signin' element={<UserSignIn />} />

          <Route path='/vendor-login' element={<VendorLogin />} />

          <Route path='/user/home' element={<Home />} />

          <Route path='/checkout' element={<Checkout />} />

          <Route path='/orders' element={<UserOrders />} />

          <Route path='/vendor/:vendorId' element={<VendorDetails />} />

          <Route path='/cart' element={<Cart />} />

          <Route path='/vendor-dashboard' element={<VendorPage />} />
        
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
