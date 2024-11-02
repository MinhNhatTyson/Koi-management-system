import DashboardBox from "./components/dashboardBox"
import { FaUserCircle } from "react-icons/fa";
import { FaFish } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiMoneyEuroCircleLine, RiTableView } from "react-icons/ri";
import Button from '@mui/material/Button';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";
import * as React from 'react';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FaPencilAlt } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

import { FaEye } from "react-icons/fa";


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
    const [showBy, setshowBy] = React.useState('');

    const [showBysetCatBy, setCatBy] = React.useState('');

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
                                <InputLabel id="demo-simple-select-helper-label">Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={showBy}
                                    label="Age"
                                    onChange={(e) => setshowBy(e.target.value)}

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl size="small" className="w-100">
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>

                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={showBysetCatBy}
                                    onChange={(e) => setCatBy(e.target.value)}

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>



                    </div>

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered v-algin">
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
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>mô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tả</td>
                                    <td>$10</td>
                                    <td>5</td>
                                    <td><img src="https://th.bing.com/th/id/OIP.jQv8BF5WmbcjvUfga8g_WwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Product" width="50" /></td>
                                    <td>
                                        <div className="actions d-flex algin-items-center">
                                            <Button className="secondary" color="secondary"><FaEye/></Button>
                                            <Button className="success"  color="success"><FaPencilAlt/></Button>
                                            <Button className="error" color="error"><MdDelete/></Button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>mô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tả</td>
                                    <td>$10</td>
                                    <td>5</td>
                                    <td><img src="https://th.bing.com/th/id/OIP.jQv8BF5WmbcjvUfga8g_WwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Product" width="50" /></td>
                                    <td>
                                        <div className="actions d-flex algin-items-center">
                                            <Button className="secondary" color="secondary"><FaEye/></Button>
                                            <Button className="success"  color="success"><FaPencilAlt/></Button>
                                            <Button className="error" color="error"><MdDelete/></Button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>mô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tả</td>
                                    <td>$10</td>
                                    <td>5</td>
                                    <td><img src="https://th.bing.com/th/id/OIP.jQv8BF5WmbcjvUfga8g_WwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Product" width="50" /></td>
                                    <td>
                                        <div className="actions d-flex algin-items-center">
                                            <Button className="secondary" color="secondary"><FaEye/></Button>
                                            <Button className="success"  color="success"><FaPencilAlt/></Button>
                                            <Button className="error" color="error"><MdDelete/></Button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>mô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tả</td>
                                    <td>$10</td>
                                    <td>5</td>
                                    <td><img src="https://th.bing.com/th/id/OIP.jQv8BF5WmbcjvUfga8g_WwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Product" width="50" /></td>
                                    <td>
                                        <div className="actions d-flex algin-items-center">
                                            <Button className="secondary" color="secondary"><FaEye/></Button>
                                            <Button className="success"  color="success"><FaPencilAlt/></Button>
                                            <Button className="error" color="error"><MdDelete/></Button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Name</td>
                                    <td>mô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tảmô tả</td>
                                    <td>$10</td>
                                    <td>5</td>
                                    <td><img src="https://th.bing.com/th/id/OIP.jQv8BF5WmbcjvUfga8g_WwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Product" width="50" /></td>
                                    <td>
                                        <div className="actions d-flex algin-items-center">
                                            <Button className="secondary" color="secondary"><FaEye/></Button>
                                            <Button className="success"  color="success"><FaPencilAlt/></Button>
                                            <Button className="error" color="error"><MdDelete/></Button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                         
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard    