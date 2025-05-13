import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = document.cookie.includes("loginId");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/Mypage"); // 로그인 상태면 마이페이지 이동
        } else {
            navigate("/Login"); // 로그인 안 되어 있으면 로그인 페이지 이동
        }
    };

    const handleLogout = () => {
        // 쿠키 삭제 (expires를 과거로 설정)
        document.cookie = "loginId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        alert("로그아웃 되었습니다.");
        window.location.reload(); // 새로고침하여 로그인 상태 반영
    };

    return (
        <div className="navbar">
            <ul className="nav-list">
                <li onClick={() => navigate("/Shop")}><a>SHOP</a></li>
                <li onClick={() => navigate("/Center")}><a>CENTER</a></li>
                <li onClick={() => navigate("/Rootfind")}><a>ROOTFIND</a></li>
                <li
                    className="brand-dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <a>BRAND</a>
                    <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                        <li><a onClick={() => navigate("/BRAND")}>ABOUT</a></li>
                        <li><a onClick={() => navigate("/QnA")}>Q&A</a></li>
                        <li><a onClick={() => navigate("/SERVICE")}>SERVICE</a></li>
                    </ul>
                </li>
            </ul>
            <img src="/icons/MainIcon.svg" alt="MainIcon" className="MainIcon" onClick={() => navigate("/")}
                 style={{cursor: "pointer"}}/>
            <div className="nav-icons">
                <img src="/icons/search.svg" alt="searchIcon"/>
                <img src="/icons/market.svg" alt="marketIcon" onClick={() => navigate("/Cart")}/>
                <img
                    src="/icons/profile.svg"
                    alt="profileIcon"
                    onClick={handleProfileClick} // 클릭 시 로그인 상태 체크 후 이동
                    style={{cursor: "pointer"}}
                />
                {isLoggedIn && (
                    <img
                        src="/icons/logout.svg" // 추가 아이콘 이미지
                        alt="extraIcon"
                        style={{cursor: "pointer"}}
                        onClick={handleLogout}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar;