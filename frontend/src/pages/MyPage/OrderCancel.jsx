import React from "react";

const OrderCancel = ({ order }) => {
  // order가 없을 때 예외처리
  if (!order) return <div>주문 정보가 없습니다.</div>;

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <h1>주문 상세</h1>
        <span>{order.date || "25.03.01"}</span>
      </div>
      <div className="order-detail-section">
        <div className="order-detail-row">
          <div className="order-detail-label">배송</div>
          <div className="order-detail-value">
            서울시 송파구 마천동 123-34 엘지빌라<br />
            010-****-2484<br />
            배송시 요청사항: 부재시 경비실에 맡겨주세요.
          </div>
        </div>
        <div className="order-detail-row">
          <div className="order-detail-label">상품 정보</div>
          <div className="order-detail-value">
            <div className="order-detail-product">
              <img
                src={order.image}
                alt={order.name}
                className="order-detail-product-img"
              />
              <div>
                <div className="order-detail-product-name">{order.name}</div>
                <div className="order-detail-product-option">{order.option}</div>
                <div className="order-detail-product-qty">
                  수량: {order.quantity}
                </div>
                <div className="order-detail-product-price">
                  {order.price.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-detail-row">
          <div className="order-detail-label">결제 정보</div>
          <div className="order-detail-value">
            <div className="order-detail-payment">
              <div>
                <span>주문금액</span>
                <span>50,000원</span>
              </div>
              <div>
                <span>배송비</span>
                <span>무료배송</span>
              </div>
              <div>
                <span>등급 할인</span>
                <span style={{ color: "red" }}>-1,500원</span>
              </div>
              <div>
                <span>최종 결제 금액</span>
                <span>48,500원</span>
              </div>
              <div>
                <span>결제 수단</span>
                <span>카카오페이</span>
              </div>
              <div>
                <span>받은 적립금</span>
                <span>480원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCancel;