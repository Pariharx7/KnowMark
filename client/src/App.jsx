import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </Router>
  )
}

export default App
