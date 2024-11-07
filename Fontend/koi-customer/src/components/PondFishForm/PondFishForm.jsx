import React, { useState } from 'react';
import './PondFishForm.css';
import { useNavigate } from 'react-router-dom';
import { GiDoubleFish } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { SiSpond } from "react-icons/si";
import { FaChartBar } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
const PondFishForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };
    const [isModalOpenFish, setIsModalOpenFish] = useState(false);
    const handleOpenModalFish = () => setIsModalOpenFish(true);
    const handleCloseModalFish = () => setIsModalOpenFish(false);
    const handleOverlayClickFish = (event) => {
        if (event.target.classList.contains('modal-overlay-fish')) {
            handleCloseModalFish();
        }
    };

    const navigate = useNavigate();
    const fishData = [
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
        { id: 1, name: "Goldfish", age: "2 years", image: "https://images.pexels.com/photos/6130076/pexels-photo-6130076.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },

    ];

    return (
        <div className="pond-fish-form">
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
                        <h2>Fish Information</h2>
                        <form className="fish-form">
                            <div className="fish-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Fish</h3>
                                    <label>
                                        Name:
                                        <input type="text" name="name" />
                                    </label>
                                    <label>
                                        Image:
                                        <input type="text" name="iamge" />
                                    </label>
                                    <label>
                                        Age:
                                        <input type="number" name="age" />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" name="size" />
                                    </label>
                                    <label>
                                        Weight:
                                        <input type="text" name="weight" />
                                    </label>
                                    <label>
                                        Breed:
                                        <input type="text" name="gender" />
                                    </label>
                                    <label>
                                        Origin:
                                        <input type="text" name="origin" />
                                    </label>
                                    <label>
                                        Price:
                                        <input type="text" name="price" />
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


            <div className="main-sections">
                <div className="character-section">
                    <img src="https://images.pexels.com/photos/26743117/pexels-photo-26743117/free-photo-of-n-c-ao-ca-ch-p-nh-d-ng-v-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Character" className="character-image" />
                </div>
                <div className="stats-section">
                    <div className="stats-title" style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Pond Stats</h2>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button style={{ backgroundColor: "#03C03C", color: "white", border: "none", borderRadius: "5px", paddingBottom : "5px" }}>
                                <FaCheckSquare style={{marginRight: "5px"}}/>
                                <FaChartBar />
                            </button>
                            <button onClick={handleOpenModal}
                            style={{ backgroundColor: "#00CCFF", color: "white", border: "none", borderRadius: "5px", paddingBottom : "5px" }}>
                                <FaEdit />
                                <SiSpond />
                            </button>
                            <button style={{ backgroundColor: "#FF033E", color: "white", border: "none", borderRadius: "5px", paddingBottom : "5px" }}>
                                <MdDelete />
                                <SiSpond />
                            </button>
                        </div>
                    </div>
                    <div className="stat-list">
                        <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight :"900"}}>
                        <span className="stat-label" style={{color : "#F28C28"}}>Pond</span>
                    </div>
                    <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight :"900"}}>
                        <span className="stat-label" style={{color : "#F28C28"}}>Parameter</span>
                    </div>

                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">PondName</span>
                        <span className="stat-value">Test Pond</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">ParameterID</span>
                        <span className="stat-value">1</span>
                    </div>

                    <div className="stat-item">
                        <span className="stat-label">Size</span>
                        <span className="stat-value">400</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">MeasurementDate</span>
                        <span className="stat-value">2024-11-06</span>
                    </div>

                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Volume</span>
                        <span className="stat-value">2000</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Temperature</span>
                        <span className="stat-value">23.0</span>
                    </div>

                    <div className="stat-item">
                        <span className="stat-label">PumpCapacity</span>
                        <span className="stat-value">180</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Salinity</span>
                        <span className="stat-value">29</span>
                    </div>

                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">WaterDischargeRate</span>
                        <span className="stat-value">140</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">pH</span>
                        <span className="stat-value">7.6</span>
                    </div>

                    <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight :"900", marginTop : "10px"}}>
                        <span className="stat-label" style={{color : "#F28C28"}}>Salt</span>
                    </div>
                    <div className="stat-item" style={{border : "none"}}>
                        
                    </div>

                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">SaltID</span>
                        <span className="stat-value">Test Pond</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Oxygen</span>
                        <span className="stat-value">8.0</span>
                    </div>

                    <div className="stat-item">
                        <span className="stat-label">Calculation Date</span>
                        <span className="stat-value">2024-11-06</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">NO2</span>
                        <span className="stat-value">0.02</span>
                    </div>

                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Salt Amount</span>
                        <span className="stat-value">27</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">NO3</span>
                        <span className="stat-value">0.5</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Notes</span>
                        <span className="stat-value">Standard maintenance dose</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">PO4</span>
                        <span className="stat-value">0.1</span>
                    </div>
                    </div>
                </div>
            </div>

            <div className="fish-section">
                <div className="fish-title" style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>Fish List</h2>
                    <button onClick={handleOpenModalFish}
                    style={{backgroundColor: "#318CE7", color: "white", borderRadius: "10px", paddingBottom : "5px"}}>
                        <IoIosAddCircle />
                        <GiDoubleFish />
                    </button>
                </div>
                <div className="fish-list">
                    {fishData.map(fish => (
                    <div className="fish-item" key={fish.id} onClick={() => navigate('/koi-fish')}>
                        <img src={fish.image} alt={fish.name} className="fish-image" />
                        <div className="fish-info">
                            <span className="fish-name">{fish.name}</span>
                            <span className="fish-age">{fish.age}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PondFishForm;
