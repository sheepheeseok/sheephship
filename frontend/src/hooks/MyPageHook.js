import { useState, useEffect } from "react";
import axios from "axios";
import useCookie from "../hooks/useCookie.js";

const MyPageHook = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);
    const [members, setMembers] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginId = useCookie("loginId"); // 로그인된 회원 ID
    const fetchOrderList = async (startDate, endDate) => {
        if (!loginId) return;

        try {
            const res = await axios.get(`/api/orderList/${loginId}/${startDate}/${endDate}`, {
                withCredentials: true,
            });
            setOrderList(res.data);
            return res.data;
        } catch (err) {
            setError(err);
            return [];
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

    const loadCancelOrderList = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/cancleOrderList", {
                withCredentials: true,
            });
            setOrderList(res.data);
            return res.data;
        } catch (err) {
            console.error("취소 주문 목록 조회 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId, orderItemIds) => {
        try {
            const response = await axios.post(
                "/api/cancelorder",
                { orderId, orderItemIds },
                { withCredentials: true }
            );
            console.log("🗑️ 주문 취소 성공:", response.data);
            return response.data;
        } catch (err) {
            console.error("❌ 주문 취소 실패:", err);
            throw err;
        }
    };

    useEffect(() => {
        if (!loginId) return;

        const today = new Date();

        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const startDate = `${yyyy}-${mm}-${dd}`;

        // ✅ 하루 뒤 날짜 계산
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        const yyyyNext = nextDay.getFullYear();
        const mmNext = String(nextDay.getMonth() + 1).padStart(2, "0");
        const ddNext = String(nextDay.getDate()).padStart(2, "0");
        const endDate = `${yyyyNext}-${mmNext}-${ddNext}`;

        // ✅ 동일한 날짜를 startDate, endDate로 초기 호출
        fetchOrderList(startDate, endDate);
    }, [loginId]);

    const loadMembers = async () => {
        try {
            const response = await axios.post("/api/admin/getAllMembers", null, {
                withCredentials: true,
            });
            setMembers(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const loadCurrentUserInfo = async () => { // ✅ 사용자 정보 불러오는 함수
        try {
            const response = await axios.post("/api/updateMemberInfo", null, {
                withCredentials: true,
            });
            setUserInfo(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const [orderQuoList, setOrderQuoList] = useState(null);
    const [loadingOrderQuo, setLoadingOrderQuo] = useState(false);
    const [errorOrderQuo, setErrorOrderQuo] = useState(null);

    const loadOrderQuoList = async () => {
        setLoadingOrderQuo(true);
        try {
            const response = await axios.get("/api/getOrderQuo", {
                withCredentials: true,
            });
            setOrderQuoList(response.data);
            return response.data; // 필요 시 호출부에서 사용 가능
        } catch (err) {
            setErrorOrderQuo(err);
        } finally {
            setLoadingOrderQuo(false);
        }
    };


    return {
        members,
        userInfo,
        orderList,
        loading,
        error,
        reloadOrderList: fetchOrderList,
        fetchOrderDetail,
        cancelOrder,
        loadCancelOrderList,
        loadMembers,
        loadCurrentUserInfo,
        orderQuoList,
        loadingOrderQuo,
        errorOrderQuo,
        loadOrderQuoList,
    };
};

export default MyPageHook;