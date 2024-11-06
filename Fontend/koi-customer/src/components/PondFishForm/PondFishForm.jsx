import React from 'react';
import './PondFishForm.css';

const PondFishForm = () => {
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
            <div className="main-sections">
                <div className="character-section">
                    <img src="https://images.pexels.com/photos/26743117/pexels-photo-26743117/free-photo-of-n-c-ao-ca-ch-p-nh-d-ng-v-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Character" className="character-image" />
                </div>
                <div className="stats-section">
                    <div className="stats-title" style={{ borderBottom: "2px solid gray", marginBottom: "15px" }}>
                        <h2>Pond Stats</h2>
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
                <div className="fish-title" style={{ borderBottom: "2px solid gray", marginBottom: "15px"}}>
                    <h2>Fish List</h2>
                </div>
                <div className="fish-list">
                    {fishData.map(fish => (
                    <div className="fish-item" key={fish.id}>
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
