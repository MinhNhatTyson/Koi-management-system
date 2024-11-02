import React from 'react';
import BlogTitleForm from '../../components/BlogTitleForm/BlogTitleForm';
import BlogForm from '../../components/BlogForm/BlogForm';
import FooterTopSection from '../../components/FooterTopSection/FooterTopSection';
const Blog = () => {
  return <div>
    <BlogTitleForm/>
    <BlogForm/>
    <FooterTopSection/>
  </div>;
};

export default Blog;