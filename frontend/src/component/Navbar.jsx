import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <ul className="nav-list">
                <li onClick={() => navigate("/Shop")}><a>SHOP</a></li>
                <li onClick={() => navigate("/Center")}><a>CENTER</a></li>
                <li onClick={() => navigate("/Rootfind")}><a>ROOTFIND</a></li>
                <li onClick={() => navigate("/Brand")}><a>BRAND</a></li>
            </ul>
            <img src="/icons/MainIcon.svg" alt="MainIcon" className="MainIcon" onClick={() => navigate("/")} style={{ cursor: "pointer" }}/>
            <div className="nav-icons">
                <img src="/icons/search.svg" alt="searchIcon"/>
                <img src="/icons/market.svg" alt="marketIcon"/>
                <img src="/icons/profile.svg" alt="profileIcon" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}/>
            </div>
        </div>
    )
}

export default Navbar;