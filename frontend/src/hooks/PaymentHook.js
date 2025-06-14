import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCookie from "../hooks/useCookie.js";
import axios from "axios";

const PaymentHook = () => {
    const loginId = useCookie("loginId");
    const memberGrade = useCookie("Grade");
    const navigate = useNavigate();
    const { state } = useLocation();

    const cancelRequestedRef = useRef(false);
    const fetchedRef = useRef(false);
    const productItemsKeyRef = useRef(""); // ✅ 직전 요청된 key

    const productId = state?.productId;
    const productItems = state?.selectedOptions;

    const [productData, setProductData] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 배송지 정보 불러오기
    useEffect(() => {
        if (!loginId) return;
        axios.get(`/api/MemberDeliveryInfo/${loginId}`, { withCredentials: true })
            .then(res => {
                setDeliveryInfo(res.data);
                console.log("배송 정보:", res.data);
            })
            .catch(err => {
                console.error("❌ 배송 정보 오류:", err.message);
            });
    }, [loginId]);

    // 상품 정보 불러오기
    useEffect(() => {
        if (!productId || !productItems || productItems.length === 0) return;

        const currentKey = JSON.stringify(productItems);
        if (fetchedRef.current && productItemsKeyRef.current === currentKey) {
            console.log("🚫 이미 같은 productItems 요청됨, skip");
            return;
        }

        fetchedRef.current = true;
        productItemsKeyRef.current = currentKey;
        setLoading(true);

        axios.post("/api/buy-items", productItems, { withCredentials: true })
            .then(res => {
                setProductData(res.data.itemListDtos);
                setDeliveryFee(res.data.deliveryFee);
                console.log("✅ 구매 정보:", res.data);
            })
            .catch(err => {
                setError(err);
                console.error("❌ 구매 정보 오류:", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId, productItems]);

    // 재고 취소 함수
    const cancelStock = () => {
        if (cancelRequestedRef.current || !loginId || productData.length === 0) return;
        cancelRequestedRef.current = true;

        const cancelData = productData.map(item => ({
            itemDetailId: item.itemDetailId,
            quantity: item.stockQuantity,
        }));

        axios.post("/api/cancelStockReservation", cancelData, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("🛑 재고 예약 취소 완료");
        }).catch(err => {
            console.error("❌ 재고 예약 취소 실패:", err.message);
        });
    };

    useEffect(() => {
        return () => {
            cancelStock();
        };
    }, [productData, loginId]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (cancelRequestedRef.current || !loginId || productData.length === 0) return;
            cancelRequestedRef.current = true;

            const cancelData = productData.map(item => ({
                itemDetailId: item.itemDetailId,
                quantity: item.stockQuantity,
            }));

            navigator.sendBeacon(
                "/api/cancelStockReservation",
                new Blob([JSON.stringify(cancelData)], { type: "application/json" })
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [productData, loginId]);

    // 결제 처리
    const processPayment = async (paymentData) => {
        try {
            if (!loginId) {
                console.error("로그인되지 않은 사용자입니다.");
                return;
            }

            const orderItemDetailDtos = productData.map(item => ({
                quantity: item.stockQuantity,
                itemId: item.itemId,
                color: item.color,
                size: item.size,
                itemDetailId: item.itemDetailId,
            }));

            const payload = {
                orderItemDetailDtos,
                paymentMethod: paymentData.paymentMethod,
                requireMents: paymentData.requireMents,
                firstAddress: paymentData.firstAddress,
                secondAddress: paymentData.secondAddress,
            };

            console.log("📦 결제 요청:", JSON.stringify(payload, null, 2));

            const paymentRes = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!paymentRes.ok) throw new Error("결제 실패");

            const result = await paymentRes.text();
            console.log("✅ 결제 완료", result);

            setProductData([]);
            setDeliveryFee(0);
            cancelRequestedRef.current = true;
            fetchedRef.current = false;
            productItemsKeyRef.current = "";

            alert("주문이 완료되었습니다.");
            navigate("/Shop");
        } catch (err) {
            console.error("❌ 결제 처리 중 오류:", err.message);
        }
    };

    return {
        processPayment,
        deliveryFee,
        productData,
        loading,
        error,
        deliveryInfo,
        memberGrade
    };
};

export default PaymentHook;