import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PondFishForm.css';
import { GiDoubleFish } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { SiSpond } from "react-icons/si";
import { FaChartBar } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

const PondFishForm = () => {
    const { pondId } = useParams(); // Lấy pondId từ URL
    const [pondData, setPondData] = useState(null); // Lưu trữ dữ liệu của hồ
    const [isLoading, setIsLoading] = useState(true); // Kiểm tra trạng thái loading
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFish, setIsModalOpenFish] = useState(false);
    const navigate = useNavigate();
    const [fishData, setFishData] = useState([]);
    const [waterQualityData, setWaterQualityData] = useState(null);
    const [message, setMessage] = useState('');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);



    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };

    const handleOpenModalFish = () => setIsModalOpenFish(true);
    const handleCloseModalFish = () => setIsModalOpenFish(false);
    const handleOverlayClickFish = (event) => {
        if (event.target.classList.contains('modal-overlay-fish')) {
            handleCloseModalFish();
        }
    };
    const [showData, setShowData] = useState(false);

    const fetchWaterParameters = async () => {
        try {
            const response = await axios.get(`https://localhost:7177/api/Ponds/test-water-parameter/${pondId}`, {
                headers: {
                    'Accept': 'text/plain'
                }
            });

            console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi

            // Kiểm tra và cập nhật message
            setMessage(response.data.message || response.data.model?.message || '');

            // Cập nhật water quality data
            setWaterQualityData(response.data.model || response.data);
            setShowData(true);
        } catch (err) {
            console.error('Error fetching water parameters:', err);
            setMessage('Có lỗi xảy ra khi lấy thông số nước.');
            setShowData(false);
        }
    };
    useEffect(() => {
        setIsLoading(true);  // Đặt trạng thái loading là true khi bắt đầu gọi API

        // Gọi API để lấy thông tin hồ
        axios.get(`https://localhost:7177/api/Ponds/get-pond/${pondId}`)
            .then(response => {
                setPondData(response.data);  // Lưu trữ dữ liệu hồ vào state
            })
            .catch(err => {
                setError(err.message);  // Xử lý lỗi nếu có
            });

        // Gọi API để lấy dữ liệu cá
        axios.get(`https://localhost:7177/KoiFish/get-koi-by-pondId/${pondId}`)
            .then(response => {
                console.log(response.data);  // Kiểm tra dữ liệu trả về
                setFishData(response.data);  // Nếu API trả về một mảng thì không cần phải đặt vào mảng khác
            })
            .catch(err => {
                setError(err.message);  // Xử lý lỗi nếu có
            })
            .finally(() => {
                setIsLoading(false);
            });




    }, [pondId]);
    const handleDelete = () => {
        setIsLoading(true);
        axios
            .delete(`https://localhost:7177/api/Ponds/delete-pond/${pondId}`)
            .then(response => {
                console.log('Pond deleted successfully', response);
                // Sau khi xóa thành công, chuyển trang tới /account
                navigate('/account');  // Điều hướng sang trang Account
            })
            .catch(err => {
                setError('Failed to delete the pond.');  // Hiển thị thông báo lỗi nếu có
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);  // Đặt trạng thái loading là false khi hoàn tất
            });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                image: reader.result // Lưu hình ảnh dưới dạng Base64
            }));
        };

        if (file) {
            reader.readAsDataURL(file); // Đọc tệp hình ảnh dưới dạng Base64
        }
    };
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        age: "",
        size: "",
        weight: "",
        gender: "",  // Thêm trường gender
        breed: "",
        origin: "",
        price: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, age, size, weight, gender, breed, origin, price, image } = formData;

        // Kiểm tra xem tất cả các trường đã được điền hay chưa
        if (!name || !age || !size || !weight || !gender || !breed || !origin || !price || !image) {
            alert("Please fill in all fields.");
            return;
        }

        // Tạo đối tượng dữ liệu để gửi tới API
        const dataToSend = {
            name,
            image, // Hình ảnh dưới dạng Base64
            age,
            size,
            weight,
            gender,
            breed,
            origin,
            price,
        };

        try {
            const response = await axios.post(`https://localhost:7177/KoiFish/create-koi/${pondId}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert("Fish data submitted successfully!");
                handleCloseModalFish(); // Đóng modal sau khi thành công
                setFishData(prevFishData => [...prevFishData, response.data]); // Thêm cá mới vào danh sách
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting the form. Please check the console for details.");
        }
    };


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
                                        <input type="text" value={pondData.pondName} readOnly />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" value={pondData.size} readOnly />
                                    </label>
                                    <label>
                                        Depth:
                                        <input type="text" value={pondData.depth || ''} readOnly />
                                    </label>
                                    <label>
                                        Volume:
                                        <input type="text" value={pondData.volume} readOnly />
                                    </label>
                                    <label>
                                        Water Discharge Rate:
                                        <input type="text" value={pondData.waterDischargeRate} readOnly />
                                    </label>
                                    <label>
                                        Pump Capacity:
                                        <input type="text" value={pondData.pumpCapacity} readOnly />
                                    </label>

                                    <h3>Salt</h3>
                                    <label>
                                        Calculation Date:
                                        <input type="date" value={pondData.calculationDate || ''} readOnly />
                                    </label>
                                    <label>
                                        Salt Amount:
                                        <input type="number" value={pondData.saltAmount || ''} readOnly />
                                    </label>
                                    <label>
                                        Notes:
                                        <textarea value={pondData.notes || ''} rows="3" readOnly />
                                    </label>
                                </div>

                                {/* Right Column: ParameterID */}
                                <div className="form-column">
                                    <h3>Parameter</h3>
                                    <label>
                                        Measurement Date:
                                        <input type="date" value={pondData.measurementDate || ''} readOnly />
                                    </label>
                                    <label>
                                        Temperature:
                                        <input type="number" value={pondData.temperature || ''} readOnly />
                                    </label>
                                    <label>
                                        Salinity:
                                        <input type="number" value={pondData.salinity || ''} readOnly />
                                    </label>
                                    <label>
                                        pH:
                                        <input type="number" value={pondData.ph || ''} readOnly />
                                    </label>
                                    <label>
                                        Oxygen:
                                        <input type="number" value={pondData.oxygen || ''} readOnly />
                                    </label>
                                    <label>
                                        NO2:
                                        <input type="number" value={pondData.no2 || ''} readOnly />
                                    </label>
                                    <label>
                                        NO3:
                                        <input type="number" value={pondData.no3 || ''} readOnly />
                                    </label>
                                    <label>
                                        PO4:
                                        <input type="number" value={pondData.po4 || ''} readOnly />
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
                        <form className="fish-form" onSubmit={handleSubmit}>
                            <div className="fish-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Fish</h3>
                                    <label>
                                        Name:
                                        <input type="text" name="name" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Image:
                                        <input type="file" name="image" onChange={handleImageChange} />
                                    </label>
                                    <label>
                                        Age:
                                        <input type="number" name="age" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" name="size" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Weight:
                                        <input type="text" name="weight" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Breed:
                                        <input type="text" name="breed" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Origin:
                                        <input type="text" name="origin" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Price:
                                        <input type="text" name="price" onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Gender:
                                        <select name="gender" onChange={handleInputChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
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
                            <button style={{ backgroundColor: "#03C03C", color: "white", border: "none", borderRadius: "5px", paddingBottom: "5px" }}>
                                <FaCheckSquare onClick={fetchWaterParameters} style={{ marginRight: "5px" }} />
                                <FaChartBar />
                            </button>
                            <button onClick={handleOpenModal}
                                style={{ backgroundColor: "#00CCFF", color: "white", border: "none", borderRadius: "5px", paddingBottom: "5px" }}>
                                <FaEdit />
                                <SiSpond />
                            </button>
                            <button onClick={handleDelete} style={{ backgroundColor: "#FF033E", color: "white", border: "none", borderRadius: "5px", paddingBottom: "5px" }}>
                                <MdDelete />
                                <SiSpond />
                            </button>
                        </div>
                    </div>
                    <div className="stat-list">
                        <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight: "900" }}>
                            <span className="stat-label" style={{ color: "#F28C28" }}>Pond</span>
                        </div>
                        <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight: "900" }}>
                            <span className="stat-label" style={{ color: "#F28C28" }}>Parameter</span>
                        </div>

                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">PondName</span>
                            <span className="stat-value">{pondData?.pondName || 'N/A'}</span>
                        </div>
                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">ParameterID</span>
                            <span className="stat-value">{pondData?.parameterId || 'N/A'}</span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">Size</span>
                            <span className="stat-value">{pondData?.size || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">MeasurementDate</span>
                            <span className="stat-value">{pondData?.measurementDate || 'N/A'}</span>
                        </div>

                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">Volume</span>
                            <span className="stat-value">{pondData?.volume || 'N/A'}</span>
                        </div>
                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">Temperature</span>
                            <span className="stat-value">{pondData?.temperature || 'N/A'}</span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">PumpCapacity</span>
                            <span className="stat-value">{pondData?.pumpCapacity || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Salinity</span>
                            <span className="stat-value">{pondData?.salinity || 'N/A'}</span>
                        </div>

                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">WaterDischargeRate</span>
                            <span className="stat-value">{pondData?.waterDischargeRate || 'N/A'}</span>
                        </div>
                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">pH</span>
                            <span className="stat-value">{pondData?.ph || 'N/A'}</span>
                        </div>

                        <div className="stat-item" style={{ borderTopRightRadius: "50px", fontWeight: "900", marginTop: "10px" }}>
                            <span className="stat-label" style={{ color: "#F28C28" }}>Salt</span>
                        </div>
                        <div className="stat-item" style={{ border: "none" }}></div>

                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">SaltID</span>
                            <span className="stat-value">{pondData?.saltId || 'N/A'}</span>
                        </div>
                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">Oxygen</span>
                            <span className="stat-value">{pondData?.oxygen || 'N/A'}</span>
                        </div>

                        <div className="stat-item">
                            <span className="stat-label">Calculation Date</span>
                            <span className="stat-value">{pondData?.calculationDate || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">NO2</span>
                            <span className="stat-value">{pondData?.no2 || 'N/A'}</span>
                        </div>

                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">Salt Amount</span>
                            <span className="stat-value">{pondData?.saltAmount || 'N/A'}</span>
                        </div>
                        <div className="stat-item" style={{ background: "#1f1f2e" }}>
                            <span className="stat-label">NO3</span>
                            <span className="stat-value">{pondData?.no3 || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Notes</span>
                            <span className="stat-value">{pondData?.notes || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">PO4</span>
                            <span className="stat-value">{pondData?.po4 || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fish-section">
                <div className="fish-title" style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>Fish List</h2>
                    <button onClick={handleOpenModalFish}
                        style={{ backgroundColor: "#318CE7", color: "white", borderRadius: "10px", paddingBottom: "5px" }}>
                        <IoIosAddCircle />
                        <GiDoubleFish />
                    </button>
                </div>
                <div className="fish-list">
                    {fishData.length === 0 ? (
                        <p>No fish found</p> // Hiển thị nếu không có dữ liệu
                    ) : (
                        fishData.map(fish => (
                            <div
                                className="fish-item"
                                key={fish.koiId}
                                onClick={() => navigate(`/koi-fish/${fish.koiId}`)} // Chuyển hướng với koiId
                            >
                                <img src={fish.image} alt={fish.name} className="fish-image" />
                                <div className="fish-info">
                                    <span className="fish-name">{fish.name}</span>
                                    <span className="fish-age">{fish.age}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>


            <div>

                {showData && waterQualityData && (
                    <div style={{
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
                        <div style={{
                            background: '#fff',
                            padding: '40px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                            width: '400px',
                            maxWidth: '90%',
                            fontFamily: 'Arial, sans-serif',
                            textAlign: 'center'
                        }}>
                            <h2 style={{
                                marginBottom: '20px',
                                color: '#333',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>
                                Thông số nước
                            </h2>

                            {/* Các thông số hiển thị */}
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>Nhiệt độ:</strong> {waterQualityData.temperature} {waterQualityData.temperatureUnit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>Độ mặn:</strong> {waterQualityData.salinity || 'Không có thông số'} {waterQualityData.salinityUnit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>pH:</strong> {waterQualityData.ph} {waterQualityData.phUnit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>Oxy:</strong> {waterQualityData.oxygen} {waterQualityData.oxygenUnit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>NO2:</strong> {waterQualityData.no2} {waterQualityData.no2Unit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>NO3:</strong> {waterQualityData.no3} {waterQualityData.no3Unit}
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                                <strong>PO4:</strong> {waterQualityData.po4} {waterQualityData.po4Unit}
                            </p>

                            {/* Thông báo message */}
                            {message && (
                                <div style={{
                                    marginTop: '20px',
                                    padding: '10px',
                                    backgroundColor: '#f8d7da',
                                    borderRadius: '8px',
                                    color: '#721c24',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    {message}
                                </div>
                            )}

                            {/* Nút đóng form */}
                            <button onClick={() => setShowData(false)} style={{
                                marginTop: '20px',
                                backgroundColor: "#ff4d4f",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontSize: '16px',
                                transition: 'background-color 0.3s ease'
                            }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}


            </div>

        </div>


    );
};

export default PondFishForm;
