import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCookie from "../hooks/useCookie.js";
import axios from "axios";

const PaymentHook = () => {
    const loginId = useCookie("loginId");
    const location = useLocation();
    const { productId } = location.state || {};
    const [productData, setproductdata] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!productId) return;

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/showItem/${productId}`);
                setproductdata(res.data);
                console.log("상품 정보:",res.data);
            } catch(err) {
                setError(err);
                console.log("상품 불러오기 오류");
                console.error("❌ 상품 불러오기 오류:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const processPayment = async (paymentData) => {
            try {
                if (!loginId) {
                    console.error("로그인되지 않은 사용자입니다.");
                }

                console.log("✅ memberId 확인:", loginId);

                // 결제 데이터 송신란
                const payload = {
                    memberId: loginId,
                    paymentMethod: paymentData.paymentMethod,  // paymentData의 paymentMethod
                    requireMents: paymentData.requireMents,  // paymentData의 requireMents
                };

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

    return {processPayment, productData, loading, error};
}

export default PaymentHook;