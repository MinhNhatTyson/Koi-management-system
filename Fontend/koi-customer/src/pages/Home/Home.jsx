import React from 'react';
import BlogIntroductionForm from '../../components/BlogIntroductionForm/BlogIntroductionForm';
import HomeForm from '../../components/HomeForm/HomeForm';
import FooterTopSection from '../../components/FooterTopSection/FooterTopSection';
import Contact from '../../components/Contact/Contact';
const Home = () => {
  return <div>
    <BlogIntroductionForm/>
    <HomeForm/>
    <Contact/>
    <FooterTopSection/>
    </div>;
};

export default Home;
