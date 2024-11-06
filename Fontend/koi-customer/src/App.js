import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import Shop from './pages/Shop/Shop';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Account from './pages/Account/Account';
import Cart from './pages/Cart/Cart';
import History from './pages/History/History';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Invoice from './pages/Invoice/Invoice';
import Pond from './pages/Pond/Pond';
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<History />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/pond" element={<Pond />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
