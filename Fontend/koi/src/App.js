// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/form/Login';
import Register from './components/form/Register';
import './App.css';
import MainLayout from './layouts/MainLayout'; 
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './components/pages/Dashboard';


function App() {
  return (
      <Router>
          <Routes>
              {/* Bố cục cho các trang xác thực (login, register) */}
              <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Route>

              {/* Bố cục cho các trang chính (dashboard, etc.) */}
              
              <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
