import React, { useState } from 'react';
import './AccountForm.css';
import { SiSpond } from "react-icons/si";
import { IoFish } from "react-icons/io5";
import { FaMicroblog } from "react-icons/fa";
function AccountForm() {
    const [activeTab, setActiveTab] = useState("Blog");
    const pondItems = [
        {
            name: "Goldfish",
            image: "https://images.pexels.com/photos/13157061/pexels-photo-13157061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "A popular freshwater fish with vibrant colors.",
        },
        {
            name: "Betta Fish",
            image: "https://images.pexels.com/photos/13157061/pexels-photo-13157061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "Known for its beautiful fins and variety of colors.",
        },
        {
            name: "Koi Fish",
            image: "https://images.pexels.com/photos/13157061/pexels-photo-13157061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "A Japanese pond fish that symbolizes good luck.",
        }
    ];
    return (
        <div className="container-form-account">
            {/* Header Section */}
            <div className="header">
                <img 
                    src="https://hyl-static-res-prod.hoyolab.com/avatar/avatar30038.png?x-oss-process=image%2Fresize%2Cs_600%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" 
                    alt="Profile" 
                    className="profile-picture" 
                />
                
                <div className="profile-info">
                    <h1>Dungeondense</h1>
                    <div className="stats">
                        <span>huyhbse170436@fpt.edu.vn</span>
                        <span>3 Pond</span>
                        <span>0 Koi Fish</span>
                        <span>0 Blog</span>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className="main">
                {/* Left Section with Tags and Content */}
                <div className="left-section">
                    {/* Tags Section */}
                    <div className="tags">
                        {["Blog", "Pond", "KoiFish", "Calculate"].map((tab) => (
                            <div 
                                key={tab}
                                className={`tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="content">
                        {activeTab === "Blog" ? (
                            <div className="content-placeholder">
                                You have not posted any content yet.
                            </div>
                        ) : activeTab === "Pond" ? (
                            <div className="pond-list">
                                {pondItems.map((item, index) => (
                                    <div key={index} className="pond-card">
                                        <img src={item.image} alt={item.name} className="pond-card-image" />
                                        <div className="pond-card-content">
                                            <h3 className="pond-card-title">{item.name}</h3>
                                            <p className="pond-card-description">{item.description}</p>
                                            <div className="pond-avatar-container">
                                                <img src="https://hyl-static-res-prod.hoyolab.com/avatar/avatar30038.png?x-oss-process=image%2Fresize%2Cs_600%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" alt={`${item.name}'s avatar`} className="pond-avatar" />
                                                <span className="pond-avatar-name">DungeonDefense</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="content-placeholder">
                                Content {activeTab}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section - Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-container">
                        <div className="sidebar-item">
                            <div className="icon-container">
                                <span className="icon"><SiSpond /></span>
                                <span className="number">3</span>
                                <span className="text">Pond</span>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <div className="icon-container">
                                <span className="icon"><IoFish /></span>
                                <span className="number">0</span>
                                <span className="text">KoiFish</span>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <div className="icon-container">
                                <span className="icon"><FaMicroblog /></span>
                                <span className="number">0</span>
                                <span className="text">Blog</span>
                            </div>
                        </div>
                    </div>
                <button className="full-width-button">Enter</button>
                </div>
            </div>
        </div>
    );
}

export default AccountForm;
