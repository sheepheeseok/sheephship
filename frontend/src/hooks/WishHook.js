import { useState, useEffect } from "react";
import axios from "axios";
import useCookie from "../hooks/useCookie";

const WishHook = () => {
    const loginId = useCookie("loginId");
    const [wishItems, setWishItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ 찜 목록 불러오기
    const fetchWishItems = async () => {
        if (!loginId) return;

        setLoading(true);
        try {
            const response = await axios.get(`/api/wishList/${loginId}`, {
                withCredentials: true,
            });
            setWishItems(response.data || []);
        } catch (err) {
            console.error("❌ 찜 목록 불러오기 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ 단일 항목 삭제
    const deleteWish = async (itemId) => {
        try {
            const response = await axios.delete("/api/deleteWish", {
                data: {
                    itemId,
                    memberId: loginId,
                },
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.data === "deleteWish success") {
                // 삭제된 항목만 제외한 목록으로 갱신
                setWishItems(prev => prev.filter(item => item.itemId !== itemId));
                return true;
            } else {
                console.warn("❗ 서버 삭제 실패:", response.data);
                return false;
            }
        } catch (err) {
            console.error("❌ deleteWish API 오류:", err);
            return false;
        }
    };

    // ✅ 전체 삭제
    const deleteAllWish = async () => {
        const promises = wishItems.map(item => deleteWish(item.itemId));
        await Promise.all(promises);
    };


    useEffect(() => {
        fetchWishItems();
    }, [loginId]);

    return {
        wishItems,
        loading,
        error,
        fetchWishItems,
        deleteWish,
        deleteAllWish,
    };
};

export default WishHook;
