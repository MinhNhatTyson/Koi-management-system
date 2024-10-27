import React from 'react';
import './OurStory.css'; // Make sure to create this CSS file for styling

const OurStory = () => {
    return (
        <div className="our-story-container">
            <div className="text-section">
                <h2>Our Story: Crafting Personalized Gift Experiences</h2>
                <p>
                    At Gift4U, we believe in the power of thoughtful gifting. Our mission is to create unique and memorable gift boxes that bring joy to both the sender and the recipient. With a wide selection of customizable box templates, we aim to make every occasion extra special.
                </p>
            </div>
            <div className="image-section">
                {/* Placeholder for image, replace with an actual image URL */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi4nTZir3vwyxTTct-dqfPsw8dMBqQeAgUWw&s" alt="Gift Box" />
            </div>
        </div>
    );
};

export default OurStory;
