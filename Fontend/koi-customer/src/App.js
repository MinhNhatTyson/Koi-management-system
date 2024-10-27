import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import FooterTopSection from './components/FooterTopSection/FooterTopSection';
// import Contact from './components/Contact/Contact';
// import HomeForm from './components/HomeForm/HomeForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import OurTeam from './components/OurTeam/OurTeam';
import GetInTouch from './components/GetInTouch/GetInTouch';
import OurStory from './components/OurStory/OurStory';
const App = () => {
  return (
    <div className="App">
      <Header /> 
      {/* <HomeForm/>  */}
      {/* <main></main> */}
      <LoginForm/>
      <OurTeam/>
      <OurStory/>
      <GetInTouch/>
      <RegisterForm/>
      {/* <Contact/>
      <FooterTopSection />  */}
      <Footer /> 
    </div>
  );
};

export default App;
