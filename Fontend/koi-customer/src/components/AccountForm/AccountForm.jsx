import React, { useState, useEffect } from 'react';
import './AccountForm.css';
import { SiSpond } from "react-icons/si";
import { IoFish } from "react-icons/io5";
import { FaMicroblog } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { FaCalculator } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function AccountForm() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFish, setIsModalOpenFish] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleOpenModalFish = () => setIsModalOpenFish(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleCloseModalFish = () => setIsModalOpenFish(false);

    const [pondItems, setPondItems] = useState([]);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [waterQualityData, setWaterQualityData] = useState({
        volume: 0,
        saltConcentration: 0,
        waterChangeRate: 0,
        pondCondition: 'string',
        temperature: 0,
        phLevel: 0
    });
    const [apiResponse, setApiResponse] = useState(null); // Trạng thái phản hồi từ API
    const [error, setError] = useState(null); // Trạng thái lỗi


    const submitForm = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', waterQualityData);

        try {
            const response = await fetch('https://localhost:7177/api/CaculatorSalt/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(waterQualityData) // Gửi dữ liệu form
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setApiResponse(data); // Lưu phản hồi từ API
            setError(null); // Reset lỗi nếu có
        } catch (err) {
            console.error('Error during API call:', err);
            setError('Có lỗi xảy ra khi gọi API.'); // Hiển thị thông báo lỗi
            setApiResponse(null); // Reset phản hồi nếu có lỗi
        }

        // Giữ nguyên dữ liệu form sau khi submit
        // setWaterQualityData({
        //     volume: 0,
        //     saltConcentration: 0,
        //     waterChangeRate: 0,
        //     pondCondition: 'string',
        //     temperature: 0,
        //     phLevel: 0
        // });
        // setIsFormVisible(false); // Không đóng form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWaterQualityData({
            ...waterQualityData,
            [name]: name === 'volume' || name === 'saltConcentration' || name === 'waterChangeRate' || name === 'temperature' || name === 'phLevel'
                ? Number(value) || 0
                : value
        });
    };
    const handleOverlayClickFish = (event) => {
        if (event.target.classList.contains('modal-overlay-fish')) {
            handleCloseModalFish();
        }
    };
    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        try {
            // Gọi API lấy thông tin hồ cá
            const pondsResponse = await fetchData(
                `https://localhost:7177/api/Ponds/get-pond-by-userId/${userId}`,
                token
            );
            if (pondsResponse) {
                const formattedPonds = pondsResponse.map(pond => ({
                    pondId: pond.pondId,
                    name: pond.pondName,
                    size: pond.size,
                    measurementDate: pond.measurementDate,
                }));
                setPondItems(formattedPonds);
            }

            // Gọi API lấy thông tin user profile
            const profileResponse = await fetchData(
                `https://localhost:7177/Authen/profile?userId=${userId}`,
                token
            );
            if (profileResponse) {
                setEmail(profileResponse.email);
                setUsername(profileResponse.username);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Hàm gọi API chung
    const fetchData = async (url, token) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error(`Error fetching data from ${url}: ${response.status}`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return null;
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        const formData = new FormData(event.target);
        const userId = jwtDecode(token).userId;

        try {
            const response = await fetch(`https://localhost:7177/api/Ponds/create-pond-by-userId/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pondName: formData.get('pondName'),
                    size: parseFloat(formData.get('size')),
                    depth: parseFloat(formData.get('depth')),
                    volume: parseFloat(formData.get('volume')),
                    waterDischargeRate: parseFloat(formData.get('waterDischargeRate')),
                    pumpCapacity: parseFloat(formData.get('pumpCapacity')),
                    measurementDate: formData.get('measurementDate'),
                    temperature: parseFloat(formData.get('temperature')),
                    salinity: parseFloat(formData.get('salinity')),
                    ph: parseFloat(formData.get('ph')),
                    oxygen: parseFloat(formData.get('oxygen')),
                    no2: parseFloat(formData.get('no2')),
                    no3: parseFloat(formData.get('no3')),
                    po4: parseFloat(formData.get('po4')),
                    calculationDate: formData.get('calculationDate'),
                    saltAmount: parseFloat(formData.get('saltAmount')),
                    notes: formData.get('notes'),
                }),
            });

            if (response.ok) {
                alert("Pond created successfully!");
                setIsModalOpen(false);
                fetchUserData(); // Cập nhật lại danh sách hồ sau khi thêm mới
            } else {
                console.error("Failed to create pond:", response.status);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const handlePondClick = async (pondId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('User is not authenticated');
            return;
        }
    
        try {
            const response = await fetch(`https://localhost:7177/api/Ponds/get-pond/${pondId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const pondData = await response.json();
                // Chuyển hướng đến trang PondFishForm và truyền dữ liệu hồ
                navigate(`/pond-fish-form/${pondId}`, { state: { pondData } });
            } else {
                console.error(`Error fetching pond data: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching pond data:', error);
        }
    };
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };
    const [activeTab, setActiveTab] = useState("Blog");

    return (

        <div className="container-form-account">
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h2>Pond Information</h2>
                        <form className="pond-form" onSubmit={handleSubmit}>
                            <div className="form-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Pond Details</h3>
                                    <label>
                                        Pond Name:
                                        <input type="text" name="pondName" />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" name="size" />
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

                                    <h3>SaltID</h3>
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
                                    <h3>ParameterID</h3>
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
                    <h1>{username}</h1>
                    <div className="stats">
                        <span>{email}</span>
                        <span>{pondItems.length} Pond</span>
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
                                    <div key={index} className="pond-card" onClick={() => handlePondClick(item.pondId)}>
                                        <img src="https://images.pexels.com/photos/13157061/pexels-photo-13157061.jpeg" alt={item.name} className="pond-card-image" />
                                        <div className="pond-card-content">
                                            <h3 className="pond-card-title">{item.name}</h3>
                                            <p className="pond-card-size">Size: {item.size}</p>
                                            <p className="pond-card-date">Measurement Date: {new Date(item.measurementDate).toLocaleDateString()}</p>
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
                                <button className="square-icon-button" onClick={() => setIsFormVisible(true)}>
                                    <FaCalculator />
                                </button>
                                <span className="text">Calculate Salt</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isFormVisible && (
                    <div className="modal-overlay" style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <form onSubmit={submitForm} style={{
                            background: '#fff',
                            padding: '40px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                            width: '450px',
                            maxWidth: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            fontFamily: 'Arial, sans-serif',
                            overflowY: 'auto'
                        }}>
                            <h2 style={{
                                marginBottom: '30px',
                                textAlign: 'center',
                                color: '#333',
                                fontSize: '24px',
                                fontWeight: 'bold'
                            }}>
                                Water Quality Form
                            </h2>

                            {/* Volume Input */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    Volume (liters):
                                </label>
                                <input type="number" name="volume" value={waterQualityData.volume} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* Salt Concentration Input */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    Salt Concentration (g/L):
                                </label>
                                <input type="number" name="saltConcentration" value={waterQualityData.saltConcentration} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* Water Change Rate Input */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    Water Change Rate (%):
                                </label>
                                <input type="number" name="waterChangeRate" value={waterQualityData.waterChangeRate} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* Pond Condition Input */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    Pond Condition:
                                </label>
                                <input type="text" name="pondCondition" value={waterQualityData.pondCondition} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* Temperature Input */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    Temperature (°C):
                                </label>
                                <input type="number" name="temperature" value={waterQualityData.temperature} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* pH Level Input */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '5px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    pH Level:
                                </label>
                                <input type="number" name="phLevel" value={waterQualityData.phLevel} onChange={handleChange} style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    color: '#555',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s ease'
                                }} />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" style={{
                                marginTop: '20px',
                                backgroundColor: "#03C03C",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px 0",
                                cursor: "pointer",
                                fontSize: '16px',
                                transition: 'background-color 0.3s ease'
                            }}>
                                Submit
                            </button>

                            {/* Error Message */}
                            {error && (
                                <div style={{
                                    marginTop: '20px',
                                    color: 'red',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* API Response */}
                            {apiResponse && (
                                <div style={{
                                    marginTop: '20px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>
                                    <h3>Kết quả tính toán:</h3>
                                    <p>Số lượng muối: {apiResponse.saltAmountWithUnit}</p>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
            
        </div>

    );
}

export default AccountForm;