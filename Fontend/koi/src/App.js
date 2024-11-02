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
import OrderLayout from './layouts/OrderLayout';
import UploadProduct from './layouts/UploadProduct';
import OrderPage from './components/pages/OrderPage';
import NotificationPage from './components/pages/notifications';
import SettingPage from './components/pages/SettingPage';

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
                    <Route path="/product-upload" element={<UploadProduct />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/notification" element={<NotificationPage />} />
                    <Route path="/setting" element={<SettingPage />} />
                </Route>

                <Route element={<OrderLayout />}>

                </Route>


            </Routes>
        </Router>
    );
}

export default App;
