import React from 'react';
import './BlogForm.css';

const BlogForm = () => {
    // Sample blog data, replace with actual data as needed
    const blogs = [
        {
            title: "Koi Fish Symbolism: More Than Just a Fish",
            description: "Koi fish represent strength, perseverance, and transformation. Rooted in Japanese and Chinese cultures, they embody luck and prosperity, with each color and pattern symbolizing different virtues and meanings.",
            date: "26/10/2024",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv62txaKvM5xBFvr1ztTOpEibjLrabkGFxsw&s",
            link: "#",
        },
        {
            title: "Creating a Thriving Koi Pond: Essentials for Beginners",
            description: "Building a koi pond requires attention to water quality, temperature, and design to keep koi happy and healthy. Explore the basics of pond setup, filtration, and plant integration to create a perfect aquatic environment for your koi.",
            date: "25/10/2024",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7i7lhMJVsruiB_OBxPeVikrii8O5f53ZDfw&s",
            link: "#",
        },
        {
            title: "Understanding Koi Fish Varieties: A Guide to Colors and Patterns",
            description: "Koi fish come in a spectrum of colors and intricate patterns, each with unique names and qualities. From Kohaku’s red and white simplicity to the striking Showa, learn how to identify and appreciate these beautiful variations.",
            date: "24/10/2024",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCg4cuUTtE5zSJYkih85RltoDu3XSuwEP2Q&s",
            link: "#",
        },
    ];

    return (
        <div className="blog-container">
            {blogs.map((blog, index) => (
                <div key={index} className="blog-item">
                    <img src={blog.imageUrl} alt={blog.title} />
                    <div className="blog-content">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-description">{blog.description}</p>
                        <div className="blog-footer">
                            <span className="date">{blog.date}</span>
                            <a href={blog.link} className="info-link">Information</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogForm;
