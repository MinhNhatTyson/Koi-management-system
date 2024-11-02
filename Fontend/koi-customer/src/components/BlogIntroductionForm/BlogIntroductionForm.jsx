import React from 'react';
import './BlogIntroductionForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BlogIntroductionForm = () => {
    const newsItems = [
        { title: 'Koi Fish Colors and Patterns: Understanding the Beauty Behind Each Variation', date: '26/10/2024' },
        { title: 'Creating a Perfect Koi Pond: Design Tips for a Thriving Koi Habitat', date: '25/10/2024' },
        { title: 'Koi Fish Care for Beginners: What Every Enthusiast Should Know', date: '24/10/2024' },
        { title: 'Understanding Koi Fish Behavior: What Their Movements and Habits Tell Us', date: '24/10/2024' },
        { title: 'Koi Fish Feeding Guide: Nutritional Needs and Best Practices', date: '24/10/2024' },
    ]

    return (
        <div className="blog-introduction">
            <div className="left-section">
                <img src="https://images.pexels.com/photos/1305235/pexels-photo-1305235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Genshin Impact" className="intro-image" />
            </div>
            <div className="right-section">
                <h2>News</h2>
                <ul>
                    {newsItems.map((item, index) => (
                        <li key={index}>
                            <span className="news-title">{item.title}</span>
                            <span className="news-date">{item.date}</span>
                        </li>
                    ))}
                </ul>
                <button className="load-more">
                    <i className="fa-solid fa-plus"></i> {/* Use className here */}
                    More Information
                </button>
            </div>
        </div>
    );
};

export default BlogIntroductionForm;
