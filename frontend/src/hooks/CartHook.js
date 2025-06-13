import {useEffect, useState} from "react";
import axios from "axios";
import useCookie from "./useCookie.js";

const CartHook = () => {
    const [cartList, setCartList] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memberId = useCookie("loginId");

    const getCartList = async () => {

        try {
            const response = await axios.get(`/api/getCartList/${memberId}`, {
                withCredentials: true,
            });
            console.log("✅ 장바구니 응답:", response.data);

            setCartList(response.data.cartList);
            setDeliveryFee(response.data.deliveryFee);
            console.log("🛒 불러온 장바구니 목록:", response.data.cartList);
            console.log("🚚 배송비:", response.data.deliveryFee);
        } catch(err) {
            console.error("장바구니 조회 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!memberId) return;  // 로그인 안 되어 있으면 skip
        getCartList();
    }, [memberId]);

    const changeCartCount = async (memberId, itemId, newCount) => {
        try {
            await axios.post("/api/changeCartCount", {
                memberId: memberId,
                itemId: itemId,
                count: newCount,
            }, {
                withCredentials: true,
            });

            await getCartList();
        } catch (error) {
            console.error("🔴 수량 변경 실패:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete("/api/deleteCart", {
                data: {
                    memberId: memberId,
                    itemId: itemId,
                },
                withCredentials: true,
            });

            alert("장바구니에서 삭제되었습니다.");
            // 최신 cartList 다시 불러오기
            changeCartCount(memberId, itemId, 1); // 또는 getCartList() 직접 호출
        } catch (error) {
            console.error("장바구니 삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return {
        cartList,
        deliveryFee,
        memberId,
        loading,
        error,
        reloadCartList: getCartList,
        changeCartCount,
        handleDeleteItem,
    };
};

export default CartHook;