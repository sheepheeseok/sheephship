import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderContentCard = ({ product, onDetailClick, onCancelClick }) => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === "주문상세") {
      console.log("OrderContentCard product:", product);
      onDetailClick?.(product);
    } else if (buttonName === "주문취소") {
      console.log("🚫 주문 취소 요청:", product);
      onCancelClick?.(product);
    }
  };

  // 주문 취소 가능한 상태만 필터링
  const canCancel = product.status === "ORDER" || product.status === "CONFIRM";

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
            {/* 조건부 버튼 렌더링 */}
            {canCancel && (
                <button
                    className={activeButton === "주문취소" ? "active" : ""}
                    onClick={() => handleClick("주문취소")}
                >
                  주문취소
                </button>
            )}
            <button
                className={activeButton === "주문상세" ? "active" : ""}
                onClick={() => handleClick("주문상세")}
            >
              주문상세
            </button>
          </div>
        </div>
      </div>
  );
};


export default OrderContentCard;
