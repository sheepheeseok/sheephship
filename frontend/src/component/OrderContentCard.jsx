import React, { useState } from "react";

const OrderContentCard = ({ product }) => {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="order-card-container">
            <div className="order-card-date">{product.date}</div>
            <div className="order-card-box">
                <div className="order-card-image-wrap">
                    <img src={product.image} alt={product.name} className="order-card-image" />
                </div>
                <div className="order-card-info-right">
                    <div className="order-card-name">{product.name}</div>
                    <div className="order-card-detail">수량: {product.quantity}</div>
                    <div className="order-card-price">{product.price.toLocaleString()}원</div>
                </div>
                <div className="order-card-button-wrap">
                    {["주문취소", "주문상세", "재구매"].map((btn) => (
                        <button
                            key={btn}
                            className={activeButton === btn ? "active" : ""}
                            onClick={() => handleClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderContentCard;
