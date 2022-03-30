import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './views/LandingPage/LandingPage';
import { Login } from './views/Login/LoginPage';
import { Register } from './views/Register/RegisterPage';
import Auth  from './HOC/Auth'
const App = () => {
  const NewLandingPage = Auth(LandingPage, null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={NewLandingPage} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
