import { useState, useEffect } from "react";
import axios from "axios";
import useCookie from "../hooks/useCookie.js";

const MyPageHook = () => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginId = useCookie("loginId"); // 로그인된 회원 ID
    console.log(loginId);
    const fetchOrderList = async () => {
        if (!loginId) return;

        try {
            const res = await axios.get(`/api/orderList/${loginId}`, {
                withCredentials: true,
            });
            console.log("✅ 주문 목록:", res.data);
            setOrderList(res.data);
        } catch (err) {
            console.error("❌ 주문 목록 불러오기 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderList();
    }, [loginId]);

    return {
        orderList,
        loading,
        error,
        reloadOrderList: fetchOrderList,
    };
};

export default MyPageHook;