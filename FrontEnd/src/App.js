import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Profile from './pages/Profile'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './pages/ProtectedRoute'
import Swagger from './pages/Swagger'


const App = () => {
  
  return (
    <>
    <Router>
      <ToastContainer/>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute/>}> 
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/swagger" element={<Swagger/>} /> 
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
