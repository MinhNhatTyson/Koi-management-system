import React from 'react';
import './HomeForm.css';

function HomeForm() {
  return (
      <div className="HomeForm">
      <main className="main">
          <section className="gift-experience">
            <div className="left-side">
                <div className="title">
                    <h1 className="create">The Grace of Koi:</h1>
                    <p className="subtitle"> Uncovering the Symbolism and History</p>
                </div>
                <div className="description">
                    <p  className="pdes">Dive into the cultural significance of koi fish, from their symbolism in Eastern cultures to their history as symbols of luck, perseverance, and transformation.</p>
                </div>
            </div>
            <div className="right-side">
                <div className='right-image'>
                  <img src="https://i.pinimg.com/564x/1f/ea/78/1fea782f65e6c1a4ccd584e6285feb06.jpg" alt="Gift Box" />
                </div>
            </div>
          </section>

          <section className="featuresTitle">
            <div className="featureTitle">
              <h1>The Enchanting World of Koi Fish: Symbolism, Care, and Beauty</h1>
            </div>
          </section>

          <section className="features">
            <div className="feature">
              <h3>Koi Fish Symbolism: More Than Just a Fish</h3>
              <p>Koi fish represent strength, perseverance, and transformation. Rooted in Japanese and Chinese cultures, they embody luck and prosperity, with each color and pattern symbolizing different virtues and meanings.</p>
            </div>
            <div className="feature">
              <h3>Creating a Thriving Koi Pond: Essentials for Beginners</h3>
              <p>Building a koi pond requires attention to water quality, temperature, and design to keep koi happy and healthy. Explore the basics of pond setup, filtration, and plant integration to create a perfect aquatic environment for your koi.</p>
            </div>
            <div className="feature">
              <h3>Understanding Koi Fish Varieties: A Guide to Colors and Patterns</h3>
              <p>Koi fish come in a spectrum of colors and intricate patterns, each with unique names and qualities. From Kohaku’s red and white simplicity to the striking Showa, learn how to identify and appreciate these beautiful variations.</p>
            </div>
          </section>

          <section className="gift-box">
            <div className="box-image">
              <img src="https://i.pinimg.com/236x/33/50/a7/3350a74f606ed101c61e764400af55aa.jpg" alt="Gift Box" />
            </div>
            <div className="box-content">
              <h2>The Life Cycle of a Koi Fish: Growth and Development in Every Stage</h2>
              <p>Discover the fascinating life cycle of koi fish, from hatchlings to adulthood, and learn how to support each stage of their growth.</p>
              <button>Inderstand more</button>
            </div>
          </section>

      </main>
    </div>
  );
}

export default HomeForm;