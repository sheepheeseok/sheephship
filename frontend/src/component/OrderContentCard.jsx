import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderContentCard = ({ product,onDetailClick, onCancelClick }) => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "주문상세") {
      console.log("OrderContentCard product:", product);
      onDetailClick?.(product);
    } else if (buttonName === "주문취소") {
      console.log("🚫 주문 취소 요청:", product);
      onCancelClick?.(product); // 상위에서 콜백을 넘겨줘야 함
    }
  };

  return (
    <div className="order-card-container">
      <div className="order-card-date">{product.date}</div>
      <div className="order-card-box">
        <div className="order-card-image-wrap">
          <img src={product.image} alt={product.name} className="order-card-image"/>
        </div>
        <div className="order-card-info-right">
          <div className="order-card-name">{product.name}</div>
          <div className="order-card-detail">수량: {product.quantity}</div>
          <div className="order-card-price">{product.price.toLocaleString()}원</div>
        </div>
        <div className="order-card-button-wrap">
          {["주문취소", "주문상세"].map((btn) => (
              <button
                  key={btn}
                  className={activeButton === btn ? "active" : ""}
                  onClick={() => handleClick(btn)}  // ✅ 중복 실행 방지
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
