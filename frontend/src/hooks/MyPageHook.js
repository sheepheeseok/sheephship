import { useState, useEffect } from "react";
import axios from "axios";
import useCookie from "../hooks/useCookie.js";

const MyPageHook = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginId = useCookie("loginId"); // 로그인된 회원 ID
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

    const fetchOrderDetail = async (orderId) => {
        try {
            const res = await axios.get(`/api/orderDetail/${orderId}`, {
                withCredentials: true,
            });
            console.log("📦 주문 상세:", res.data);
            setOrderDetail(res.data);
            return res.data;
        } catch (err) {
            console.error("❌ 주문 상세 조회 실패:", err);
            setError(err);
            return null;
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
        fetchOrderDetail,
    };
};

export default MyPageHook;