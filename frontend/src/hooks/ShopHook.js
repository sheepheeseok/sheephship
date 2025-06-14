import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopHook = () => {
    const navigate = useNavigate();

    const handleClickProduct = async (itemId) => {
        try {
            // ✅ 최근 본 상품 등록 (쿠키에 저장)
            await axios.post(`/api/recent/add/${itemId}`, null, {
                withCredentials: true,
            });
        } catch (err) {
            console.error("최근 본 상품 등록 실패:", err);
            // 실패하더라도 상세페이지로 이동
        }

        // ✅ 상세 페이지로 이동
        navigate(`/Product/${itemId}`);
    };

    return { handleClickProduct };
};

export default ShopHook;
