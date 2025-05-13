import React from "react";
import { useState } from "react";

const Cart = () => {
    const [count, setCount] = useState(1);

    const btnDecrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const btnIncrease = () => {
        setCount(count + 1);
    };

    return (
        <div className="container" style={{alignItems: "start", flexDirection: "row"}}>
            <div className="payment-userInfobox">
                <h1>장바구니</h1>
                    <div className="payment-product-info">
                        <img src="/imgs/products/2-pants(1).jpg" alt="payment-product"
                             className="payment-product"/>
                        <div className="payment-product-detail">
                            <div className="cart-selectBox">
                                <h1 style={{marginBottom: "5px"}}>클라이밍 바지</h1>
                                <div className="cart-btn">
                                    <button><img src="/icons/heart.svg"/></button>
                                    <button><img src="/icons/delete.svg"/></button>
                                </div>
                            </div>
                            <h2>사이즈 : L</h2>
                            <h2 style={{marginTop: "5px"}}>수량: 1개</h2>
                            <h2 style={{marginTop: "5px"}}>컬러 : GRAY</h2>
                            <div className="cart-productCount">
                                <div className="cart-countBox">
                                    <button onClick={btnDecrease}><img src="/icons/minus.svg"/></button>
                                    <h1 style={{marginLeft: "30px", marginRight: "30px"}}>{count}</h1>
                                    <button onClick={btnIncrease}><img src="/icons/plus.svg"/></button>
                                </div>
                                <h1 style={{ fontSize: "30px"}}>50,000원</h1>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="payment-productBox">
                <h1>구매 상품</h1>

                <h1 style={{fontFamily: "NotoSansKR-Medium", marginLeft: "37px", marginBottom: "10px", marginTop: "25px"}}>결제 정보</h1>
                <div className="payment-product-price">
                    <h1>주문상품</h1>
                    <h1>50,000원</h1>
                </div>
                <div className="payment-product-price">
                    <h1>배송비</h1>
                    <h1>없음</h1>
                </div>
                <div className="p-address-line" style={{marginBottom: "15px"}}/>
                <div className="p-result-box">
                    <div className="p-result-price">
                        <h1 style={{fontSize: "24px"}}>최종 결제 금액</h1>
                        <h1 style={{fontSize: "32px", marginTop: "7px"}}>48,500원</h1>
                    </div>
                    <div className="p-result-price" style={{marginTop: "10px"}}>
                        <h2 style={{marginBottom: "2px"}}>적립 예정금액</h2>
                        <h2 style={{fontSize: "24px"}}>485원</h2>
                    </div>
                </div>
                <button className="cart-resultBtn">결제하기</button>
                <button className="cart-resultBtn2">돌아가기</button>
            </div>
        </div>
    )
}

export default Cart;