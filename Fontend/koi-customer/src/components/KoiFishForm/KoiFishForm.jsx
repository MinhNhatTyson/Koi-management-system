import { useEffect, useState } from 'react';
import './KoiFishForm.css';
import { GiDoubleFish } from "react-icons/gi";
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { GiFoodChain } from "react-icons/gi";
import { FaNotesMedical } from "react-icons/fa6";
import axios from 'axios'; // Sửa từ 'axios' thành 'axios' (không có dấu ngoặc)

const KoiFishForm = ({ onDelete }) => {
    const [growthDataa, setGrowthDataa] = useState([]); // Khởi tạo là mảng
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedAmount, setFeedAmount] = useState(null); // Lưu lượng thức ăn
    const [feedDetails, setFeedDetails] = useState(null);
    const { koiId } = useParams(); // Lấy koiId từ URL    const [showForm, setShowForm] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [koiGrowthId, setKoiGrowthId] = useState(null);
    const [selectedGrowthId, setSelectedGrowthId] = useState(null);
    const [feedDataa, setFeedData] = useState([]);

    const [koiData, setKoiData] = useState(null); // State để lưu dữ liệu cá koi
    const navigate = useNavigate(); // Khai báo useNavigate
    const [growthData, setGrowthData] = useState({
        growthDate: '',
        size: 0,
        weight: 0,
        notes: ''
    });

    const [isFormVisible, setFormVisibility] = useState(false);
    const [feedingDetails, setFeedingDetails] = useState({
        feedingDate: '',
        feedAmount: '',
        feedingNotes: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFeedingInputChange = (event) => {
        const { name, value } = event.target;
        setFeedingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };


    const hideFeedingForm = () => {
        setFormVisibility(false);
        setFeedingDetails({ feedingDate: '', feedingAmount: '', feedingNotes: '' }); // Reset form
    };

    const submitFeedingDetails = async (growthId) => {
        if (!growthId) {
            setErrorMessage('Chưa chọn một Growth ID');
            return;
        }

        try {
            const response = await axios.post(
                `https://localhost:7177/api/FeedSchedule/Create?koiGrowthId=${growthId}`,
                {
                    feedDate: feedingDetails.feedingDate, // Ensure you are sending the correct data format
                    feedAmount: feedingDetails.feedingAmount,
                    notes: feedingDetails.feedingNotes
                }
            );
            console.log('Response:', response.data);

            // Reset form fields after success
            setFeedingDetails({
                feedingDate: '',
                feedingAmount: '',
                feedingNotes: ''
            });

            // Optionally, clear the error message if any
            setErrorMessage('');
        } catch (error) {
            console.error('Error saving feeding details:', error);
            setErrorMessage('Đã xảy ra lỗi khi lưu thông tin thức ăn.');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGrowthData({
            ...growthData,
            [name]: name === 'size' || name === 'weight' ? Number(value) || 0 : value // Chuyển đổi thành số cho size và weight
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Đảm bảo growthDate được định dạng theo kiểu YYYY-MM-DD
        const formattedGrowthData = {
            growthDate: growthData.growthDate, // Đã là định dạng đúng
            size: growthData.size,
            weight: growthData.weight,
            notes: growthData.notes
        };

        try {
            await axios.post(`https://localhost:7177/api/KoiGrowth/create-koigrowth/${koiId}`, formattedGrowthData);
            alert("Koi Growth created successfully!");
        } catch (error) {
            console.error("Error creating koi growth:", error);
            alert("There was an error creating the koi growth. Please try again.");
        }
    };
    const handleCalculateFeed = async (growthId) => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`https://localhost:7177/api/FeedSchedule/CalculateFeed/${growthId}`);
            setFeedDetails(response.data);
            setShowForm(true); // Hiển thị form khi nhận dữ liệu
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFeedDetails(null);
    };

    const handleDelete = async (growthId) => {
        try {
            const response = await axios.delete(`https://localhost:7177/api/KoiGrowth/delete-koigrowth/${growthId}`);
            console.log(response.data); // Kiểm tra phản hồi từ server
            setGrowthDataa(growthDataa.filter(growth => growth.growthId !== growthId)); // Cập nhật state để loại bỏ mục
            onDelete(growthId); // Thông báo cho component cha biết để xóa khỏi danh sách
            alert("Koi Growth deleted successfully!");
        } catch (error) {
            console.error("Error deleting growth:", error);
            alert("Error deleting growth. Please try again.");
        }
    };


    useEffect(() => {
        const fetchKoiData = async () => {
            try {
                const response = await axios.get(`https://localhost:7177/KoiFish/get-koi-by-Id/${koiId}`);
                setKoiData(response.data); // Lưu dữ liệu vào state

            } catch (error) {
                console.error("Error fetching koi data:", error);
            }


            try {
                const response = await axios.get(`https://localhost:7177/api/KoiGrowth/get-koigrowth-by-id/${koiId}`);
                console.log(response.data); // Kiểm tra dữ liệu trả về
                setGrowthDataa(Array.isArray(response.data) ? response.data : [response.data]); // Đảm bảo là mảng
                const data = Array.isArray(response.data) ? response.data : [response.data];
                if (data.length > 0) {
                    const growthId = data[0].growthId; // Giả định là bạn muốn lấy growthId của mục đầu tiên
                    console.log("Growth ID:", growthId); // In ra growthId
                }
            } catch (err) {
                setError("Error fetching data. Please try again.");
            } finally {
                setLoading(false);
            }


        };


        fetchKoiData();
    }, [koiId]);
    const handleDeleteKoi = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this koi?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://localhost:7177/KoiFish/delete-koi/${koiId}`);
                alert("Koi deleted successfully!");
                navigate('/account'); // Chuyển hướng về trang /account
            } catch (error) {
                console.error("Error deleting koi:", error);
                alert("There was an error deleting the koi. Please try again.");
            }
        }
    };

    const feedData = [

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

    const handleOpenModalFeeding = async (growthId) => {
        setSelectedGrowthId(growthId); // Lưu growthId vào state khi mở modal
        setFormVisibility(true); // Hiển thị form
        setIsModalOpenFeeding(true);

        try {
            const response = await axios.get(`https://localhost:7177/api/FeedSchedule/GetByKoiGrowthId/${growthId}`);
            console.log('API Response:', response.data);  // Kiểm tra dữ liệu nhận được từ API
            setFeedData(response.data);  // Set dữ liệu vào state
        } catch (error) {
            console.error("Error fetching feeding data:", error);
        }
    };
    const handleCloseModalFeeding = () => {
        setIsModalOpenFeeding(false);  // Close the modal
        setFeedData([]);               // Optionally reset the feed data
    };
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
                                        <input type="text" name="name" value={koiData?.name || ''} readOnly />
                                    </label>
                                    <label>
                                        Image:
                                        <input type="text" name="image" value={koiData?.image || ''} readOnly />
                                    </label>
                                    <label>
                                        Age:
                                        <input type="number" name="age" value={koiData?.age || ''} readOnly />
                                    </label>
                                    <label>
                                        Size:
                                        <input type="text" name="size" value={koiData?.size || ''} readOnly />
                                    </label>
                                    <label>
                                        Weight:
                                        <input type="text" name="weight" value={koiData?.weight || ''} readOnly />
                                    </label>
                                    <label>
                                        Breed:
                                        <input type="text" name="breed" value={koiData?.breed || ''} readOnly />
                                    </label>
                                    <label>
                                        Origin:
                                        <input type="text" name="origin" value={koiData?.origin || ''} readOnly />
                                    </label>
                                    <label>
                                        Price:
                                        <input type="text" name="price" value={koiData?.price || ''} readOnly />
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
                        <form className="fish-growth-form" onSubmit={handleSubmit}>
                            <div className="fish-growth-columns">
                                {/* Left Column: Pond Details and SaltID */}
                                <div className="form-column">
                                    <h3>Fish Growth</h3>
                                    <label>
                                        Growth Date:
                                        <input
                                            type="date"
                                            name="growthDate"
                                            value={growthData.growthDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Size (cm):
                                        <input
                                            type="number" // Sử dụng kiểu number
                                            name="size"
                                            value={growthData.size}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Weight (kg):
                                        <input
                                            type="number" // Sử dụng kiểu number
                                            name="weight"
                                            value={growthData.weight}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Notes:
                                        <textarea
                                            name="notes"
                                            rows="3"
                                            value={growthData.notes}
                                            onChange={handleChange}
                                        />
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
                                {feedDataa && feedDataa.length > 0 ? (
                                    feedDataa.map((feed, index) => (
                                        <tr key={feed.feedDate + index}> {/* Sử dụng feed.feedDate + index cho key */}
                                            <td>{new Date(feed.feedDate).toLocaleDateString()}</td>
                                            <td>{feed.feedAmount}</td>
                                            <td>{feed.notes}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No feeding data available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button onClick={handleCloseModalFeeding}>Close</button>  {/* Close the modal */}


                        {isFormVisible ? (
                            <div className="feeding-form">
                                <label>
                                    Ngày cho ăn:
                                    <input
                                        type="date"
                                        name="feedingDate"
                                        value={feedingDetails.feedingDate}
                                        onChange={handleFeedingInputChange}
                                    />
                                </label>
                                <label>
                                    Khối lượng cho ăn (kg):
                                    <input
                                        type="number"
                                        name="feedingAmount"
                                        value={feedingDetails.feedingAmount}
                                        onChange={handleFeedingInputChange}
                                    />
                                </label>
                                <label>
                                    Ghi chú:
                                    <textarea
                                        name="feedingNotes"
                                        value={feedingDetails.feedingNotes}
                                        onChange={handleFeedingInputChange}
                                    />
                                </label>
                                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                                <div className="button-group">
                                    {/* Truyền growthId từ selectedGrowthId */}
                                    <button type="button" onClick={() => submitFeedingDetails(selectedGrowthId)}>
                                        Lưu
                                    </button>
                                    <button type="button" onClick={hideFeedingForm}>Hủy</button>
                                </div>
                            </div>
                        ) : (
                            <div className="button-group">
                                <button onClick={() => handleOpenModalFeeding(growthData.growthId)}>
                                    Thêm thông tin cho ăn
                                </button>
                                <button onClick={hideFeedingForm}>Đóng</button>
                            </div>
                        )}
                    </div>
                </div>
            )}


            <div className="koi-fish-details">
                <div className="koi-fish-image">
                    {/* Kiểm tra nếu koiData tồn tại và có thuộc tính image */}
                    {koiData && koiData.image ? (
                        <img src={koiData.image} alt="Koi Fish" style={{ width: '100%', borderRadius: '10px' }} />
                    ) : (
                        <p>Image not available</p> // Hiển thị thông báo nếu không có hình ảnh
                    )}
                </div>
                <div className="koi-fish-info">
                    <div style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Kiểm tra nếu koiData tồn tại và có thuộc tính name */}
                        <h2 className="koi-title">{koiData ? koiData.name : "No name available"}</h2>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                            <button onClick={handleOpenModalFish}
                                style={{ backgroundColor: "#00CCFF", color: "white", borderRadius: "10px", paddingBottom: "5px" }}>
                                <FaEdit />
                                <GiDoubleFish />
                            </button>
                            <button onClick={handleDeleteKoi}
                                style={{ backgroundColor: "#FF033E", color: "white", borderRadius: "10px", paddingBottom: "5px" }}>
                                <MdDelete />
                                <GiDoubleFish />
                            </button>
                        </div>
                    </div>
                    <div className="koi-fish-stats">
                        {/* Kiểm tra nếu koiData tồn tại */}
                        {koiData ? (
                            <>
                                <div className="stat-item" style={{ background: "#1f1f2e", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                    <span className="stat-label">KoiId</span>
                                    <span className="stat-value">{koiData.koiId}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Name</span>
                                    <span className="stat-value">{koiData.name}</span>
                                </div>
                                <div className="stat-item" style={{ background: "#1f1f2e" }}>
                                    <span className="stat-label">Age</span>
                                    <span className="stat-value">{koiData.age}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Size</span>
                                    <span className="stat-value">{koiData.size}</span>
                                </div>
                                <div className="stat-item" style={{ background: "#1f1f2e" }}>
                                    <span className="stat-label">Weight</span>
                                    <span className="stat-value">{koiData.weight}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Gender</span>
                                    <span className="stat-value">{koiData.gender}</span>
                                </div>
                                <div className="stat-item" style={{ background: "#1f1f2e" }}>
                                    <span className="stat-label">Breed</span>
                                    <span className="stat-value">{koiData.breed}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Origin</span>
                                    <span className="stat-value">{koiData.origin}</span>
                                </div>
                                <div className="stat-item" style={{ background: "#1f1f2e", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                    <span className="stat-label">Price</span>
                                    <span className="stat-value">{koiData.price}</span>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p> // Hiển thị khi dữ liệu đang được tải
                        )}
                    </div>
                </div>
            </div>

            {/* Growth Information Section Below */}
            <div className="koi-fish-growth">
                <div style={{ borderBottom: "2px solid gray", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 className="growth-title">Koi Fish Growth History</h3>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                        <button onClick={handleOpenModalFishGrowth}
                            style={{ backgroundColor: "#318CE7", color: "white", borderRadius: "10px", paddingBottom: "5px" }}>
                            <IoIosAddCircle style={{ marginRight: "5px" }} />
                            <FaChartLine />
                        </button>
                    </div>
                </div>
                <div className="growth-list">
                    {growthDataa.map((growth, index) => (
                        <div key={index} className="growth-item">
                            <div className="growth-left">
                                <span className="growth-date">Date: {growth.growthDate}</span>
                                <span className="growth-size">Size: {growth.size} cm</span>
                                <span className="growth-weight">Weight: {growth.weight} kg</span>
                                <span className="growth-notes">Notes: {growth.notes}</span>
                            </div>
                            <div className="growth-right">
                                <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => handleCalculateFeed(growth.growthId)} // Gọi hàm với growthId
                                        style={{ backgroundColor: "#03C03C", color: "white", borderRadius: "10px", display: "flex", alignItems: "center" }}
                                    >
                                        <FaCalculator style={{ marginRight: "5px" }} />
                                        <GiFoodChain />
                                    </button>
                                </div>
                                <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                                    <button onClick={() => handleDelete(growth.growthId)}
                                        style={{
                                            backgroundColor: "#FF033E",
                                            color: "white",
                                            borderRadius: "10px"
                                        }}>
                                        <MdDelete style={{ marginRight: "5px" }} />
                                        <FaChartLine />
                                    </button>
                                </div>
                                <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
                                    <button onClick={() => handleOpenModalFeeding(growth.growthId)}
                                        style={{
                                            backgroundColor: "#318CE7",
                                            color: "white",
                                            borderRadius: "10px"
                                        }}>
                                        <IoIosAddCircle style={{ marginRight: "5px" }} />
                                        <FaNotesMedical />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {loading && <div>Loading...</div>}
                {error && <div>Error fetching feed amount. Please try again.</div>}
                {showForm && feedDetails && (
                    <div className="feed-details-form" style={styles.formContainer}>
                        <div style={styles.form}>
                            <h3>Thông Tin Thức Ăn</h3>
                            <p><strong>Ngày cho ăn:</strong> {new Date(feedDetails.feedDate).toLocaleString()}</p>
                            <p><strong>Lượng thức ăn:</strong> {feedDetails.feedAmount} gram</p>
                            <p><strong>Ghi chú:</strong> {feedDetails.notes}</p>
                            <button onClick={handleCloseForm} style={{ marginTop: '10px' }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
};
const styles = {
    formContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background with transparency
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000 // Ensure it appears above other elements
    },
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
};

export default KoiFishForm;
