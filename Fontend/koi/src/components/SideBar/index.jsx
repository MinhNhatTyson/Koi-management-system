import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart, FaChevronRight } from "react-icons/fa";
import { FaFish } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiLogoutBoxFill } from "react-icons/ri";
import { MyContext } from '../../layouts/MainLayout';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const context = useContext(MyContext)
    const isOpenSubMenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }
  
    
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <Button className='w-100'>
                            <span className='icon'><MdDashboard /></span>
                            Dashboard
                            <span className='arrow'><FaChevronRight /></span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Button
                        className={`w-100 ${activeTab === 1 && isToggleSubmenu === false ? 'active' : ''}`}
                        onClick={() => isOpenSubMenu(1)}
                    >
                        <span className='icon'><FaFish /></span>
                        Products
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>

                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu=== true ? 'collapse' : 'collapsed'}`}>
                        <div className='submenu'>
                            <ul>
                                <li><Link to="/dashboard">Product List</Link></li>
                                <li><Link to="/product-upload">Product Upload</Link></li>
                            </ul>
                        </div>
                    </div>
                </li>

                <li>
                    <Link to="/order">
                        <Button className='w-100'>
                            <span className='icon'><FaShoppingCart /></span>
                            Orders
                            <span className='arrow'><FaChevronRight /></span>
                        </Button>
                    </Link>
                </li>

                <li>
                <Link to="/notification">
                    <Button className='w-100'>
                        <span className='icon'><FaBell /></span>
                        Notification
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    </Link>
                </li>


                <li>
                <Link to="/setting">
                    <Button className='w-100'>
                        <span className='icon'><IoIosSettings /></span>
                        Setting
                        <span className='arrow'><FaChevronRight /></span>
                    </Button>
                    </Link>
                </li>
            </ul>

            <br/>
            <div className='logoutWrapper'>
                <div className='logoutBox'>
                    <Button  variant="contained" 
            sx={{ backgroundColor: 'orange', color: '#fff' }}><RiLogoutBoxFill/> Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
