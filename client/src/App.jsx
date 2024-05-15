import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Singin from './pages/Signin'
import SingUp from './pages/SingUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path= "/" element={<Home />}></Route>
        <Route path= "/about" element={<About />}></Route>
        <Route path= "/sing-in" element={<Singin />}></Route>
        <Route path= "/sing-up" element={<SingUp />}></Route>
        <Route path= "/dashboard" element={<Dashboard />}></Route>
        <Route path= "/projects" element={<Projects />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
