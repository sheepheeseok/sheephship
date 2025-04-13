import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = document.cookie.includes("loginId"); // 쿠키에 loginId 존재 여부 확인

    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/Login"); // 로그인 안 되어 있으면 홈으로 이동
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null; // 로그인된 경우에만 페이지 표시
};

export default PrivateRoute;
