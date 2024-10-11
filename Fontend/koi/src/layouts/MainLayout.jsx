// src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../Header/Index.jsx';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar/index.jsx'; // Đảm bảo đường dẫn là chính xác
// import '../App.css'; 
import '../App.css'

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className='main d-flex align-items-center'>
                <div className='sidebarWrapper'>
                    <Sidebar />
                </div>
                <main className='content'>
                    <Outlet /> {/* Đây là nơi hiển thị các trang con */}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
