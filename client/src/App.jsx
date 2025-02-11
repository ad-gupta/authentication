import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/home' element = {<Home/>} />
      <Route path='/register'  element = {<Register />} />
      <Route path='/' element = {<Login />} />
    </Routes>
  )
}

export default App
