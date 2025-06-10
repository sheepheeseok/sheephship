import { useEffect, useState } from "react";
import useCookie from "../hooks/useCookie.js";
import axios from "axios";
import {useLocation} from "react-router-dom";

const PaymentHook = () => {
    const loginId = useCookie("loginId");
    const { state } = useLocation();
    const [productData, setproductData] = useState([]);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productId = state?.productId;
    const productItems = state?.selectedOptions;
    const [deliveryInfo, setDeliveryInfo] = useState(null);

    useEffect(() => {
        if (!loginId) return;

        const fetchDeliveryInfo = async () => {
            try {
                const res = await axios.get(`/api/MemberDeliveryInfo/${loginId}`, {
                    withCredentials: true,
                });
                console.log("배송 정보:", res.data);
                setDeliveryInfo(res.data);
            } catch (err) {
                console.error("❌ 배송 정보 불러오기 오류:", err.message);
            }
        };

        fetchDeliveryInfo();
    }, [loginId]);


    useEffect(() => {
        if (!productId || !productItems || productItems.length === 0) return;

        const fetchBuyItemInfo = async () => {
            try {
                const res = await axios.post(
                    "/api/buy-items",
                    productItems,
                    { withCredentials: true } // 쿠키(loginId)를 함께 전송
                );
                console.log("구매 정보:", res.data);
                setproductData(res.data.itemListDtos);
                setDeliveryFee(res.data.deliveryFee);
            } catch (err) {
                setError(err);
                console.error("❌ 구매 정보 불러오기 오류:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBuyItemInfo();
    }, [productId, productItems]);

    const processPayment = async (paymentData) => {
            try {
                if (!loginId) {
                    console.error("로그인되지 않은 사용자입니다.");
                }

                console.log("✅ memberId 확인:", loginId);

                const orderItemDetailDtos = productData.map(item => ({
                    quantity: item.stockQuantity,
                    itemId: item.itemId,
                    color: item.color,
                    size: item.size,
                    itemDetailId: item.itemDetailId,
                }));

                // 결제 데이터 송신란
                const payload = {
                    orderItemDetailDtos,
                    paymentMethod: paymentData.paymentMethod,  // paymentData의 paymentMethod
                    requireMents: paymentData.requireMents,
                    firstAddress: paymentData.firstAddress,
                    secondAddress: paymentData.secondAddress,
                };

                console.log("📦 전송될 결제 데이터:", JSON.stringify(payload, null, 2));

                // 결제 요청
                const paymentRes = await fetch('/api/order', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(payload),
                });

                if (!paymentRes.ok) {
                    throw new Error("결제 실패");
                }

                const result = await paymentRes.json();
                console.log("결제 완료", result);
            } catch (err) {
                console.error("결제 처리 중 오류:", err.message);
            }
        };

    return {processPayment, deliveryFee, productData, loading, error, deliveryInfo};
}

export default PaymentHook;