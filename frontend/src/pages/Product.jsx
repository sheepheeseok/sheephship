import React, { useState } from "react";

const Product = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="container">
            <div className="Product-container">
            <img src="/imgs/Productimg.png" alt="Product-img" className="Product-img"/>

                <div className="Product-box">
                    <h1>쉽쉽 메탈립 초크백 그레이 (grey)</h1>

                    <h2 style={{marginTop: "23px"}}>32,000원</h2>

                    <h2 style={{marginTop: "28px"}}>메탈립 원단으로 제작된 초크백입니다.</h2>

                    <h2 style={{marginTop: "36px"}}>허리벨트 및 버클 퀄리티 변경 (버클 YKK)</h2>
                    <h2 style={{marginTop: "12px"}}>안감 플리스 원단 컬러 변경 (라이트그레이)</h2>

                    <h2 style={{marginTop: "38px"}}>리드 등반 시 방해 받지 않도록 가볍고 심플하게 제작했습니다.</h2>

                    <div className="product-buyinfo" style={{marginTop: "27px"}}>
                        <h1>적립금</h1>
                        <h2>1%</h2>
                        <img src="/icons/info.svg" alt="info-icon" className="info-icon"/>
                    </div>
                    <div className="product-buyinfo" style={{marginTop: "15.5px"}}>
                        <h1>배송비</h1>
                        <div className="deliverly-info">
                            <h2>3,000원 (50,000원 이상 구매 시 무료)</h2>
                            <h2>제주 및 도서 산간 3,000원 추가</h2>
                        </div>
                    </div>

                    <h2 style={{fontSize: "13px", marginTop: "23.5px", marginBottom: "8.5px"}}>수량</h2>
                    <div className="buy-box">
                        <button onClick={decreaseQuantity} style={{borderRight: "1px solid #ccc"}}
                                className="buy-box-btn">-
                        </button>
                        <span className="buy-box-text">{quantity}</span>
                        <button onClick={increaseQuantity} style={{borderLeft: "1px solid #ccc"}}
                                className="buy-box-btn">+
                        </button>
                    </div>

                    <div className="buy-result-box">
                        <div className="buy-per-box">
                            <h1>주문 수량</h1>
                            <h2>1개</h2>
                        </div>
                        <div className="buy-per-box">
                            <h1>총 상품 금액</h1>
                            <h2>32,000원</h2>
                        </div>
                    </div>

                    <div className="product-btn-box">
                    <button className="buy-btn">구매하기</button>
                    <button className="cart-btn">장바구니</button>
                    </div>

                    <div className="product-toss-box">
                        <div className="product-toss-text">
                        <h1>쉽고 빠른</h1>
                        <h1>토스페이 간편결제</h1>
                        </div>
                        <button className="product-toss-btn">
                            <img src="/icons/toss-pay-logo.png.svg" alt="toss-pay-logo" className="toss-pay-logo"/>
                            구매하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;