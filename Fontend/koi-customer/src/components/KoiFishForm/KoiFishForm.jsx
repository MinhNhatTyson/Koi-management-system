import React, { useState } from 'react';
import './KoiFishForm.css';
import { GiDoubleFish } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { GiFoodChain } from "react-icons/gi";
import { FaNotesMedical } from "react-icons/fa6";
const KoiFishForm = () => {
    
    const growthData = ([
        { GrowthDate: "2023-04-01", Size: 12.5, Weight: 1.5, Notes: "Good growth" },
        { GrowthDate: "2023-07-15", Size: 13.2, Weight: 1.8, Notes: "Healthy and active" },
        { GrowthDate: "2023-10-02", Size: 14.1, Weight: 2.0, Notes: "Stable weight increase" },
        { GrowthDate: "2023-04-01", Size: 12.5, Weight: 1.5, Notes: "Good growth" },
        { GrowthDate: "2023-07-15", Size: 13.2, Weight: 1.8, Notes: "Healthy and active" },
        { GrowthDate: "2023-10-02", Size: 14.1, Weight: 2.0, Notes: "Stable weight increase" },
        { GrowthDate: "2023-04-01", Size: 12.5, Weight: 1.5, Notes: "Good growth" },
        { GrowthDate: "2023-07-15", Size: 13.2, Weight: 1.8, Notes: "Healthy and active" },
        { GrowthDate: "2023-10-02", Size: 14.1, Weight: 2.0, Notes: "Stable weight increase" },
    ]);
    const feedData = [
        { FeedDate: "2023-05-10", FeedAmount: 0.5, Notes: "Normal feeding" },
        { FeedDate: "2023-08-22", FeedAmount: 0.7, Notes: "Increased appetite" },
        { FeedDate: "2023-09-15", FeedAmount: 0.6, Notes: "Stable intake" },
    ];
    const [isModalOpenFish, setIsModalOpenFish] = useState(false);
    const handleOpenModalFish = () => setIsModalOpenFish(true);
    const handleCloseModalFish = () => setIsModalOpenFish(false);
    const handleOverlayClickFish = (event) => {
        if (event.target.classList.contains('modal-overlay-fish')) {
            handleCloseModalFish();
        }
    };

    const [isModalOpenFishGrowth, setIsModalOpenFishGrowth] = useState(false);
    const handleOpenModalFishGrowth = () => setIsModalOpenFishGrowth(true);
    const handleCloseModalFishGrowth = () => setIsModalOpenFishGrowth(false);
    const handleOverlayClickFishGrowth = (event) => {
        if (event.target.classList.contains('modal-overlay-fish-growth')) {
            handleCloseModalFishGrowth();
        }
    };
    const [isModalOpenFeeding, setIsModalOpenFeeding] = useState(false);
    const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
    const [feedingData, setFeedingData] = useState([]);
    const [newFeed, setNewFeed] = useState({ FeedDate: '', FeedAmount: '', Notes: '' });

    const handleOpenModalFeeding = () => setIsModalOpenFeeding(true);
    const handleCloseModalFeeding = () => setIsModalOpenFeeding(false);

    const handleAddNote = () => setIsAddNoteVisible(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeed({ ...newFeed, [name]: value });
    };

    const handleSaveNote = () => {
        setFeedingData([...feedingData, newFeed]);
        setNewFeed({ FeedDate: '', FeedAmount: '', Notes: '' }); // Reset form fields
        setIsAddNoteVisible(false); // Close the add note form
    };
    return (
        <div className="koi-fish-form">
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


            {isModalOpenFishGrowth && (
                <div className="modal-overlay-fish-growth" onClick={handleOverlayClickFishGrowth}>
                    <div className="modal-content-fish-growth">
                        <h2>Fish Growth Information</h2>
                        <form className="fish-growth-form">
                            <div className="fish-growth-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Fish Growth</h3>
                                    <label>
                                        Growth Date:
                                        <input type="date" name="growthDate" />
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
                                        Notes:
                                        <textarea name="notes" rows="3"></textarea>
                                    </label>
                                </div>
                            </div>
                            <div className="button-group-fish-growth">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCloseModalFishGrowth}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalOpenFeeding && (
                <div className="modal-overlay-feeding" onClick={handleCloseModalFeeding}>
                    <div className="modal-content-feeding" onClick={(e) => e.stopPropagation()}>
                        <h2>Feeding History</h2>
                        <table className="feeding-table">
                            <thead>
                                <tr>
                                    <th>Feed Date</th>
                                    <th>Feed Amount (kg)</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedData.map((feed, index) => (
                                    <tr key={index}>
                                        <td>{feed.FeedDate}</td>
                                        <td>{feed.FeedAmount}</td>
                                        <td>{feed.Notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {isAddNoteVisible ? (
                            <div className="add-note-form">
                                <label>
                                    Feed Date:
                                    <input
                                        type="date"
                                        name="FeedDate"
                                        value={newFeed.FeedDate}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Feed Amount (kg):
                                    <input
                                        type="number"
                                        name="FeedAmount"
                                        value={newFeed.FeedAmount}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Notes:
                                    <textarea
                                        name="Notes"
                                        value={newFeed.Notes}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <div className="button-group-feeding">
                                    <button onClick={handleSaveNote}>Save</button>
                                    <button onClick={() => setIsAddNoteVisible(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="button-group-feeding">
                                <button onClick={handleAddNote}>Add Note</button>
                                <button onClick={handleCloseModalFeeding}>Close</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            
            <div className="koi-fish-details">
                <div className="koi-fish-image">
                    <img src="https://images.pexels.com/photos/26743117/pexels-photo-26743117/free-photo-of-n-c-ao-ca-ch-p-nh-d-ng-v-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Koi Fish" />
                </div>
                <div className="koi-fish-info">
                <div style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <h2 className="koi-title">Koi Fish Stats</h2>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                        <button onClick={handleOpenModalFish}
                        style={{backgroundColor: "#00CCFF", color: "white", borderRadius: "10px", paddingBottom: "5px"}}>
                            <FaEdit />
                            <GiDoubleFish />
                        </button>
                        <button style={{backgroundColor: "#FF033E", color: "white", borderRadius: "10px", paddingBottom: "5px"}}>
                            <MdDelete />
                            <GiDoubleFish />
                        </button>
                    </div>
                </div>      
                <div className="koi-fish-stats">
                    <div className="stat-item" style={{ background: "#1f1f2e",borderTopLeftRadius: "10px",borderTopRightRadius: "10px" }}>
                        <span className="stat-label">KoiId</span>
                        <span className="stat-value">1594</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Name</span>
                        <span className="stat-value">Iure</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Age</span>
                        <span className="stat-value">10</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Size</span>
                        <span className="stat-value">10.25</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Weight</span>
                        <span className="stat-value">1.06</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Gender</span>
                        <span className="stat-value">Female</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e" }}>
                        <span className="stat-label">Breed</span>
                        <span className="stat-value">Sint</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Origin</span>
                        <span className="stat-value">India</span>
                    </div>
                    <div className="stat-item" style={{ background: "#1f1f2e",borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px" }}>
                        <span className="stat-label">Price</span>
                        <span className="stat-value">81.46</span>
                    </div>
                </div>
                </div>
            </div>

            {/* Growth Information Section Below */}
            <div className="koi-fish-growth">
            <div style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3 className="growth-title">Koi Fish Growth History</h3>
                <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                    <button onClick={handleOpenModalFishGrowth}
                    style={{backgroundColor: "#318CE7", color: "white", borderRadius: "10px", paddingBottom: "5px"}}>
                        <IoIosAddCircle style={{marginRight : "5px"}}/>
                        <FaChartLine />
                    </button>
                </div>
            </div>
            <div className="growth-list">
                {growthData.map((growth, index) => (
                    <div key={index} className="growth-item">
                        <div className="growth-left">
                            <span className="growth-date">Date: {growth.GrowthDate}</span>
                            <span className="growth-size">Size: {growth.Size} cm</span>
                            <span className="growth-weight">Weight: {growth.Weight} kg</span>
                            <span className="growth-notes">Notes: {growth.Notes}</span>
                        </div>
                    <div className="growth-right">
                        <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                            <button style={{backgroundColor: "#03C03C", color: "white", borderRadius: "10px"}}>
                                <FaCalculator  style={{marginRight : "5px"}}/>
                                <GiFoodChain />
                            </button>
                        </div>
                        <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                            <button 
                            style={{
                                backgroundColor: "#FF033E", 
                                color: "white", 
                                borderRadius: "10px"}}>
                                <MdDelete  style={{marginRight : "5px"}}/>
                                <FaChartLine />
                            </button>
                         </div>
                        <div style={{ margin: "10px", display: "flex", gap: "10px"}}>
                            <button onClick={handleOpenModalFeeding}
                            style={{
                                backgroundColor: "#318CE7",
                                color: "white", 
                                borderRadius: "10px"}}>
                                <IoIosAddCircle  style={{marginRight : "5px"}}/>
                                <FaNotesMedical />
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default KoiFishForm;
