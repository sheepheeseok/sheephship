// src/component/OrderContentCard.jsx
import React from "react";

const OrderContentCard = ({ orderDate, productImage, productName, quantity, size, color, price }) => {
    return (
        <div className="card-wrapper">
            <div className="order-date">{orderDate}</div>

            <div className="product-info">
                <img src={productImage} className="product-image" />

                <div className="product-details">
                    <p className="product-name">{productName}</p>

                    <div className="product-options">
                        <span>수량: {quantity}</span>
                        <span>사이즈: {size}</span>
                        <span>색상: {color}</span>
                    </div>

                    <p className="product-price">{price.toLocaleString()}원</p>
                </div>

                <div className="button-group">
                    <button className="od-button">주문취소</button>
                    <button className="od-button">주문상세</button>
                    <button className="od-button">재구매</button>
                </div>
            </div>
        </div>
    );
};

export default OrderContentCard;
