// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet để hiển thị các Route con

const AuthLayout = () => {
    return (
        <div>
            <main>
                <Outlet /> {/* Đây là nơi hiển thị các trang con */}
            </main>
        </div>
    );
};

export default AuthLayout;
