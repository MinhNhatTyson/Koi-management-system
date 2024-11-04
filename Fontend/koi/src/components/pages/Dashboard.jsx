import React, { useEffect, useState } from "react";
import DashboardBox from "./components/dashboardBox";
import { FaUserCircle, FaFish, FaPencilAlt, FaEye } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdDelete } from "react-icons/md";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
];

export const options = {
    'backgroundColor': 'transparent',
    'chartArea': { 'width': '100%', 'height': '100%', 'left': '37%' },
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [showBy, setShowBy] = useState('');
    const [showBySetCatBy, setCatBy] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://localhost:7230/Product/get-all-product");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data); // Store data in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`https://localhost:7230/Product/delete-product?productID=${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            // Update the state to remove the deleted product
            setProducts(products.filter(product => product.productId !== productId));
            console.log(`Product with ID ${productId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-9">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaFish />} grow={true} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<FiShoppingCart />} grow={false} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<RiMoneyEuroCircleLine />} grow={true} />
                        </div>
                    </div>

                    <div className="col-md-3 pl-0">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <div className="totalPrice">
                                    <h6 className="text-white mb-0 mt-0">TOTAL PRICE</h6>
                                    <h3 className="text-white font-weight-bold">3.300.3000.300VND</h3>
                                    <p>3.300.3000VND in last month</p>
                                </div>
                            </div>
                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="244px"
                                data={data}
                                options={options}
                            />
                        </div>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <h3 className="hd">All Products</h3>
                    <div className="row cardFilters mt-3">
                        <div className="col-md-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className="w-100">
                                <InputLabel id="show-by-label">Name</InputLabel>
                                <Select
                                    labelId="show-by-label"
                                    id="show-by-select"
                                    value={showBy}
                                    onChange={(e) => setShowBy(e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl size="small" className="w-100">
                                <InputLabel id="category-by-label">Category</InputLabel>
                                <Select
                                    labelId="category-by-label"
                                    id="category-by-select"
                                    value={showBySetCatBy}
                                    onChange={(e) => setCatBy(e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>IMAGE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stockQuantity}</td>
                                        <td>
                                            <img src={product.image} alt={product.productName} width="50" />
                                        </td>
                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Button className="secondary" color="secondary"><FaEye /></Button>
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                                <Button
                                                    className="error"
                                                    color="error"
                                                    onClick={() => handleDelete(product.productId)} // Call delete function on click
                                                >
                                                    <MdDelete />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
