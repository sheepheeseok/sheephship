import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <div className="navbar">
            <ul className="nav-list">
                <li><a href="shop">SHOP</a></li>
                <li><a href="#">CENTER</a></li>
                <li><a href="#">ROOTFIND</a></li>
                <li
                    className="brand-dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <a href="#">BRAND</a>
                    <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                        <li><a href="#" onClick={() => navigate("/BRAND")}>ABOUT</a></li>
                        <li><a href="#" onClick={() => navigate("/QnA")}>Q&A</a></li>
                        <li><a href="#" onClick={() => navigate("/faq")}>FAQ</a></li>
                    </ul>
                </li>
            </ul>
            <img src="/icons/MainIcon.svg" alt="MainIcon" className="MainIcon" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
            <div className="nav-icons">
                <img src="/icons/search.svg" alt="searchIcon" />
                <img src="/icons/market.svg" alt="marketIcon" />
                <img src="/icons/profile.svg" alt="profileIcon" onClick={() => navigate("/login")} style={{ cursor: "pointer" }} />
            </div>
        </div>
    );
};

export default Navbar;
