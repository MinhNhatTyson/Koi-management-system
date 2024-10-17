import { FaFish } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
const DashboardBox = (props) => {
    return (
        <Button className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color && props.color[0]} , ${props.color && props.color[1]})`
        }}>
            {
                props.grow === true ?
                <span className="chart"><TrendingUpIcon/></span>
                :
                <span className="chart"><TrendingDownIcon/></span>
            }
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white mb-0">Total Product</h4>
                    <span className="text-white">277</span>
                </div>

                <div className="m1-auto">
                    {
                        props.icon ?
                            <span span className="icon">
                                {props.icon ? props.icon : ''}
                            </span>
                            :
                            ''
                    }


                </div>

              

            </div>
            <div className="d-flex align-items-center w-100 bottomEle">
                    <div className="lastmonth">
                      <h6 className="text-white mb-0 mt-0">Last Month</h6> 
                      </div> 
                      <Button className="m1-auto toggleIcon"><HiOutlineDotsVertical/></Button>
                </div>
        </Button>
    )

}
export default DashboardBox