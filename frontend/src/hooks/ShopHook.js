import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WishHook from "./WishHook.js";
import useCookie from "./useCookie.js";

const ShopHook = (category, page) => {
    const navigate = useNavigate();
    const loginId = useCookie("loginId");

    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        wishItems,
        fetchWishItems,
    } = WishHook();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/getItembyCategory/${category}/${page}`);
                setProducts(res.data.listByCategory);
                setTotalCount(res.data.page); // 전체 상품 개수 (페이지 수 아님)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, page]);

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

    const addWish = async (itemId, memberId) => {
        try {
            const response = await axios.post("/api/addWish", {
                itemId,
                memberId
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (response.data === "addWish success") {
                console.log("🟢 찜 성공");
                return true;
            } else {
                console.warn("🔴 찜 실패");
                return false;
            }
        } catch (error) {
            console.error("❌ 찜 요청 중 오류 발생:", error);
            return false;
        }
    };
    const handleAddToWishList = async (product) => {
        const isDuplicate = wishItems.some(item => item.itemId === product.itemId);
        if (isDuplicate) {
            alert("이미 위시리스트에 있습니다.");
            return;
        }

        const success = await addWish(product.itemId, loginId);
        if (success) {
            alert("위시리스트에 추가되었습니다!");
            fetchWishItems(); // 다시 서버에서 찜 목록 갱신
        } else {
            alert("서버 오류: 추가에 실패했습니다.");
        }
    };

    return { handleClickProduct, products, totalCount, loading, error, addWish, handleAddToWishList };
};

export default ShopHook;
