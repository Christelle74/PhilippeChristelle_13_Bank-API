import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Account from './pages/Account'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path="/profil" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
