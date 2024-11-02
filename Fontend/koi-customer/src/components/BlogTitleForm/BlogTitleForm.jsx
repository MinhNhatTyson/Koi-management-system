import React from 'react';
import './BlogTitleForm.css';

const blogPosts = [
  {
    id: 1,
    title: 'Koi Fish Symbolism: More Than Just a Fish',
    description: 'Koi fish represent strength, perseverance, and transformation. Rooted in Japanese and Chinese cultures, they embody luck and prosperity, with each color and pattern symbolizing different virtues and meanings.',
    date: '15/10/2024',
    infoLink: '#',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv62txaKvM5xBFvr1ztTOpEibjLrabkGFxsw&s'
  },
  {
    id: 2,
    title: 'Creating a Thriving Koi Pond: Essentials for Beginners',
    description: 'Building a koi pond requires attention to water quality, temperature, and design to keep koi happy and healthy. Explore the basics of pond setup, filtration, and plant integration to create a perfect aquatic environment for your koi.',
    date: '11/10/2024',
    infoLink: '#',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7i7lhMJVsruiB_OBxPeVikrii8O5f53ZDfw&s'
  },
  {
    id: 3,
    title: 'Understanding Koi Fish Varieties: A Guide to Colors and Patterns',
    description: 'Koi fish come in a spectrum of colors and intricate patterns, each with unique names and qualities. From Kohaku’s red and white simplicity to the striking Showa, learn how to identify and appreciate these beautiful variations.',
    date: '07/10/2024',
    infoLink: '#',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCg4cuUTtE5zSJYkih85RltoDu3XSuwEP2Q&s'
  }
];

const BlogTitleForm = () => {
  return (
    <div className="blog-title-form">
      {blogPosts.map((post) => (
        <div className="blog-card" key={post.id}>
          <img src={post.imageUrl} alt={post.title} className="blog-image" />
          <div className="blog-contentt">
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-description">{post.description}</p>
            <div className="blog-footer">
              <span className="blog-date">{post.date}</span>
              <a href={post.infoLink} className="blog-info">Information</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogTitleForm;
