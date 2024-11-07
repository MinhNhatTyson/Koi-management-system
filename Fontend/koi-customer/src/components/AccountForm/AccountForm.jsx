import React, { useState } from 'react';
import './AccountForm.css';
import { SiSpond } from "react-icons/si";
import { IoFish } from "react-icons/io5";
import { FaMicroblog } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCalculator } from "react-icons/fa";
function AccountForm() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFish, setIsModalOpenFish] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleOpenModalFish = () => setIsModalOpenFish(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleCloseModalFish = () => setIsModalOpenFish(false);
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };
    const handleOverlayClickFish = (event) => {
        if (event.target.classList.contains('modal-overlay-fish')) {
            handleCloseModalFish();
        }
    };
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

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h2>Pond Information</h2>
                        <form className="pond-form">
                            <div className="form-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Pond</h3>
                                    <label>
                                        Pond Name:
                                        <input type="text" name="pondName" />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" name="size" />
                                    </label>
                                    <label>
                                        Depth:
                                        <input type="text" name="depth" />
                                    </label>
                                    <label>
                                        Volume:
                                        <input type="text" name="volume" />
                                    </label>
                                    <label>
                                        Water Discharge Rate:
                                        <input type="text" name="waterDischargeRate" />
                                    </label>
                                    <label>
                                        Pump Capacity:
                                        <input type="text" name="pumpCapacity" />
                                    </label>

                                    <h3>Salt</h3>
                                    <label>
                                        Calculation Date:
                                        <input type="date" name="calculationDate" />
                                    </label>
                                    <label>
                                        Salt Amount:
                                        <input type="number" name="saltAmount" />
                                    </label>
                                    <label>
                                        Notes:
                                        <textarea name="notes" rows="3"></textarea>
                                    </label>
                                </div>

                                {/* Right Column: ParameterID */}
                                <div className="form-column">
                                    <h3>Parameter</h3>
                                    <label>
                                        Measurement Date:
                                        <input type="date" name="measurementDate" />
                                    </label>
                                    <label>
                                        Temperature:
                                        <input type="number" name="temperature" />
                                    </label>
                                    <label>
                                        Salinity:
                                        <input type="number" name="salinity" />
                                    </label>
                                    <label>
                                        pH:
                                        <input type="number" name="ph" step="0.1" />
                                    </label>
                                    <label>
                                        Oxygen:
                                        <input type="number" name="oxygen" />
                                    </label>
                                    <label>
                                        NO2:
                                        <input type="number" name="no2" />
                                    </label>
                                    <label>
                                        NO3:
                                        <input type="number" name="no3" />
                                    </label>
                                    <label>
                                        PO4:
                                        <input type="number" name="po4" />
                                    </label>
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalOpenFish && (
                <div className="modal-overlay-fish" onClick={handleOverlayClickFish}>
                    <div className="modal-content-fish">
                        <h2>Calculate</h2>
                        <form className="fish-form">
                            <div className="form-columns">
                                <div className="form-column">
                                    <h3>Salt</h3>
                                    <label>
                                        Volume
                                        <input type="number" name="volume" />
                                    </label>
                                    <label>
                                        Salt Concentration
                                        <input type="number" name="saltConcentration" />
                                    </label>
                                    <label>
                                        Water Change Rate
                                        <input type="number" name="waterChangeRate" />
                                    </label>
                                    <label>
                                        Pond Condition
                                        <input type="text" name="pondCondition" />
                                    </label>
                                    <label>
                                        Temperature
                                        <input type="number" name="temperature" />
                                    </label>
                                    <label>
                                        Ph Level
                                        <input type="number" name="phLevel" />
                                    </label>
                                </div>
                            </div>
                            <div className="button-group-fish">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCloseModalFish}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                    <div key={index} className="pond-card" onClick={() => navigate('/pond')}>
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
                    <div className="sidebar-items">
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
                
                    <div className="sidebar-container">
                    <div className="sidebar-items">
                        <div className="sidebar-item">
                            <button className="square-icon-button" onClick={handleOpenModal}>
                                <SiSpond />
                            </button>
                            <span className="text">Add Pond</span>
                        </div>                   
                        <div className="sidebar-item">
                            <button className="square-icon-button">
                                <IoFish />
                            </button>
                            <span className="text">Add Fish</span>
                        </div>
                        <div className="sidebar-item">
                            <button className="square-icon-button">
                                <FaMicroblog />
                            </button>
                            <span className="text">Add Blog</span>
                        </div>
                    </div>
                    <div className="sidebar-items">
                        <div className="sidebar-item">
                            <button className="square-icon-button" onClick={handleOpenModalFish}>
                                <FaCalculator />
                            </button>
                            <span className="text">Calculate Salt</span>
                        </div>                   
                    </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default AccountForm;
