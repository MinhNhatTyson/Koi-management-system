import React from 'react';
import './OurStory.css'; // Make sure to create this CSS file for styling

const OurStory = () => {
    return (
        <div className="our-story-container">
            <div className="text-section">
                <h2>The Dragon’s Gate: A Koi’s Journey of Transformation</h2>
                <p>
                A brave koi fish faces the powerful currents of the Dragon’s Gate, a legendary waterfall. Defying all odds, it reaches the top, and the gods transform it into a mighty dragon. This tale of the Dragon Koi symbolizes courage, resilience, and the rewards of perseverance.
                </p>
            </div>
            <div className="image-section">
                {/* Placeholder for image, replace with an actual image URL */}
                <img src="https://i.pinimg.com/236x/d6/c1/ee/d6c1ee69fb3af551077b8c31fbe45e1e.jpg" alt="Gift Box" />
            </div>
        </div>
    );
};

export default OurStory;
