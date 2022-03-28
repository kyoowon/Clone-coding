import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './views/LandingPage/LandingPage';
import { Login } from './views/Login/LoginPage';
import { Register } from './views/Register/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
