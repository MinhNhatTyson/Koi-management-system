import React, { createContext, useState } from 'react';
import Header from '../Header/Index.jsx';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar/index.jsx';
import '../App.css';

export const MyContext = createContext();

const OrderLayout = () => {
    const [isToggleSidebar, setIsToggleSidebar] = useState(false);

    const values = {
        isToggleSidebar,
        setIsToggleSidebar
    };

    return (
        <MyContext.Provider value={values}>
            <div>
                <Header />
                <style>
                    {`
                        div.main.d-flex.align-items-center {
                            width: 1550px;
                        }
                        .sidebarWrapper.toggle {
                            width: 0;
                            flex: 0 0 0;
                            transition: width 0.3s ease;
                        }
                        .content.toggle {
                            width: 100%;
                            flex: 1;
                            transition: width 0.3s ease;
                        }
                          .sidebarWrapper {
                            width: 20%;
                            flex: 0 0 20%;
                            transition: width 0.3s ease;
                        }
                        .content {
                            width: 80%;
                            flex: 1;
                            transition: width 0.3s ease;
                        }
                        content .toggle{
                            width: 80%; 
                            flex: 0 0 100% ;
                        }
                        .sidebarWrapper.toggle .sidebar{
                            left: -100%;}
                        }
                    `}
                </style>
                <div className="main d-flex align-items-center">
                    <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
                        <Sidebar />
                    </div>
                    <main className={`content ${isToggleSidebar === true  ? 'toggle' : ''}`}>
                        <Outlet /> {/* Đây là nơi hiển thị các trang con */}
                    </main>
                </div>
            </div>
        </MyContext.Provider>
    );
};

export default OrderLayout;
