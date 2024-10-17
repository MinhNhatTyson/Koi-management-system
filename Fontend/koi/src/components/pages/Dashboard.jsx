import DashboardBox from "./components/dashboardBox"
import { FaUserCircle } from "react-icons/fa";
import { FaFish } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import Button from '@mui/material/Button';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";



export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
];
export const options = {
   'backgroundColor' : 'transparent',
   'chartArea':{'width':'100%','height':'100%','left': '37%'},
  };

const Dashboard = () => {
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


                </div>
            </div>
        </>
    )
}
export default Dashboard    