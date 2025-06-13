import React from "react";
import CartHook from "../hooks/CartHook.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    const navigate = useNavigate();
    const { cartList, deliveryFee, loading, error, changeCartCount, memberId, handleDeleteItem } = CartHook();

    const requestBody = cartList.map(item => ({
        itemId: item.itemId,
        itemDetailId: item.itemDetailId,  // 반드시 존재해야 함
        color: item.color,
        size: item.size,
        stockQuantity: item.count,  // 장바구니 수량
    }));

    const productIds = [...new Set(cartList.map(item => item.itemId))];

    const handlePayment = async () => {
        try {
            const requestBody = cartList.map(item => ({
                itemId: item.itemId,
                itemDetailId: item.itemDetailId,
                color: item.color,
                size: item.size,
                stockQuantity: item.count,
            }));

            const res = await axios.post("/api/buy-items", requestBody, {
                withCredentials: true,
            });

            console.log("🧾 결제 요청 성공:", res.data);

            navigate("/Payment", {
                state: {
                    productId: productIds,
                    selectedOptions: requestBody,
                },
            });
        } catch (err) {
            console.error("❌ 결제 요청 실패:", err);
            alert("결제 처리 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (!loading && cartList.length === 0) {
            alert("장바구니에 제품이 없습니다.");
            navigate("/");
        }
    }, [loading, cartList, navigate]);

    const totalProductPrice = cartList.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );
    const correctedDeliveryFee = totalProductPrice >= 40000 ? 0 : deliveryFee;
    const finalPrice = totalProductPrice + correctedDeliveryFee;
    const expectedPoint = Math.floor(totalProductPrice * 0.01);

    return (
        <div className="container" style={{alignItems: "start", flexDirection: "row"}}>
            <div className="payment-userInfobox">
                <h1>장바구니</h1>

                {cartList.map((item, index) => (
                    <div className="payment-product-info" key={index}>
                        <img src={item.mainUrl} alt="payment-product"
                             className="payment-product"/>
                        <div className="payment-product-detail">
                            <div className="cart-selectBox">
                                <h1 style={{marginBottom: "5px"}}>{item.itemName}</h1>
                                <div className="cart-btn">
                                    <button><img src="/icons/heart.svg"/></button>
                                    <button onClick={() => handleDeleteItem(item.itemId)}>
                                        <img src="/icons/delete.svg" alt="삭제"/>
                                    </button>
                                </div>
                            </div>
                            <h2>사이즈 : {item.size}</h2>
                            <h2 style={{marginTop: "5px"}}>수량: {item.count}</h2>
                            <h2 style={{marginTop: "5px"}}>컬러 : {item.color}</h2>
                            <div className="cart-productCount">
                                <div className="cart-countBox">
                                    <button     onClick={() => {
                                        if (item.count > 1) {
                                            changeCartCount(memberId, item.itemId, item.count - 1);
                                        }
                                    }}
                                    >
                                    <img src="/icons/minus.svg"/></button>
                                    <h1 style={{marginLeft: "30px", marginRight: "30px"}}>{item.count}</h1>
                                    <button onClick={() => changeCartCount(memberId, item.itemId, item.count + 1)}><img src="/icons/plus.svg"/></button>
                                </div>
                                <h1 style={{ fontSize: "30px"}}>{(item.price * item.count).toLocaleString()}원</h1>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
            <div className="payment-productBox">
                <h1>구매 상품</h1>

                <h1 style={{fontFamily: "NotoSansKR-Medium", marginLeft: "37px", marginBottom: "10px", marginTop: "25px"}}>결제 정보</h1>
                <div className="payment-product-price">
                    <h1>주문상품</h1>
                    <h1>{totalProductPrice.toLocaleString()}원</h1>
                </div>
                <div className="payment-product-price">
                    <h1>배송비</h1>
                    <h1>{correctedDeliveryFee > 0 ? `${correctedDeliveryFee.toLocaleString()}원` : "없음"}</h1>
                </div>
                <div className="p-address-line" style={{marginBottom: "15px"}}/>
                <div className="p-result-box">
                    <div className="p-result-price">
                        <h1 style={{fontSize: "24px"}}>최종 결제 금액</h1>
                        <h1 style={{fontSize: "32px", marginTop: "7px"}}>{finalPrice.toLocaleString()}원</h1>
                    </div>
                    <div className="p-result-price" style={{marginTop: "10px"}}>
                        <h2 style={{marginBottom: "2px"}}>적립 예정금액</h2>
                        <h2 style={{fontSize: "24px"}}>{expectedPoint.toLocaleString()}원</h2>
                    </div>
                </div>
                <button className="cart-resultBtn" onClick={handlePayment}>결제하기</button>
                <button className="cart-resultBtn2">돌아가기</button>
            </div>
        </div>
    )
}

export default Cart;