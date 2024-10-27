import React from 'react';
import './OurTeam.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import characterImage from '../../assets/image/character.png'; // Default image path

const teamMembers = [
  {
    name: 'John Doe',
    title: 'Founder & CEO',
    description: 'John is the visionary behind Gift4U, leading the team with passion.',
    linkedin: '#',
    email: 'mailto:john@example.com', // Updated to be functional
    website: '#',
    // image: 'path/to/john_image.png', // Individual image
  },
  {
    name: 'Jane Smith',
    title: 'Chief Marketing Officer',
    description: 'Jane drives our marketing strategies and ensures customer satisfaction.',
    linkedin: '#',
    email: 'mailto:jane@example.com', // Updated to be functional
    website: '#',
    // image: 'path/to/jane_image.png', // Individual image
  },
  {
    name: 'Jane Smith',
    title: 'Chief Marketing Officer',
    description: 'Jane drives our marketing strategies and ensures customer satisfaction.',
    linkedin: '#',
    email: '#',
    website: '#',
    // image: 'path/to/jane_image.png',
  },
  {
    name: 'Mike Johnson',
    title: 'Lead Developer',
    description: 'Mike is the technical genius behind our platform.',
    linkedin: '#',
    email: '#',
    website: '#',
    // image: 'path/to/jane_image.png',
  },
  // Add other team members similarly...
];

const OurTeam = () => {
  return (
    <section className="our-team">
      <h2>Meet Our Team</h2>
      <p>Get to know the talented individuals behind Gift4U.</p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <div className="member-photo">
              <img src={member.image || characterImage} alt={member.name} />  
            </div>
            <h3>{member.name}</h3>
            <p className="title">{member.title}</p>
            <p className="description">{member.description}</p>
            <div className="social-icons">
              <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn profile of ${member.name}`}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={member.email} target="_blank" rel="noreferrer" aria-label={`Email ${member.name}`}>
                <i className="fas fa-envelope"></i>
              </a>
              <a href={member.website} target="_blank" rel="noreferrer" aria-label={`Visit website of ${member.name}`}>
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
