import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaUser, FaHistory, FaShoppingCart } from 'react-icons/fa'; // Font Awesome Icons
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra nếu có JWT trong localStorage hoặc sessionStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt');  // Hoặc sessionStorage tùy vào cách bạn lưu trữ JWT
    if (token) {
      setIsLoggedIn(true); // Nếu có JWT, người dùng đã đăng nhập
    } else {
      setIsLoggedIn(false); // Nếu không có JWT, người dùng chưa đăng nhập
    }
  }, []);

  // Đăng xuất người dùng
  const handleLogout = () => {
    localStorage.removeItem('jwt');  // Xoá JWT khi người dùng đăng xuất
    setIsLoggedIn(false);  // Cập nhật trạng thái đăng nhập
    navigate('/login');  // Chuyển hướng đến trang login
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <h1>Koi System</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Icons */}
      <div className="icons">
        <FaUser className="icon" onClick={() => navigate('/account')}/>
        <FaShoppingCart className="icon" onClick={() => navigate('/cart')}/>
        <FaHistory className="icon" onClick={() => navigate('/history')}/>

        {/* Nếu người dùng đã đăng nhập, ẩn nút Login và Register */}
        {!isLoggedIn ? (
          <>
            <button className="auth-button" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="auth-button" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        ) : (
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
