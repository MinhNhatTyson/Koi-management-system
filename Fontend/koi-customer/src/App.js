import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import FooterTopSection from './components/FooterTopSection/FooterTopSection';
// import Contact from './components/Contact/Contact';
// import HomeForm from './components/HomeForm/HomeForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
const App = () => {
  return (
    <div className="App">
      <Header /> 
      {/* <HomeForm/>  */}
      {/* <main></main> */}
      <LoginForm/>
      <RegisterForm/>
      {/* <Contact/>
      <FooterTopSection />  */}
      <Footer /> 
    </div>
  );
};

export default App;
