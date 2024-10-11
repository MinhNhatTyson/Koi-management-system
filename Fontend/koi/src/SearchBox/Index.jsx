
import { FaSearch } from "react-icons/fa";


const SearchBox = () =>{
    return (

        <div className="searchBox posotion-relative d-flex align-items-center">
            <FaSearch/>
            <input type = "text" placeholder="Search here"></input>
        </div>
    )
}
export default SearchBox