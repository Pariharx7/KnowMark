import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { InputBox } from './components/InputBox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/ib" element={<InputBox />} />
      </Routes>
    </Router>
  )
}

export default App
