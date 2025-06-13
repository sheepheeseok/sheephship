import React, { useEffect, useState } from "react";
import MyPageHook from "../../hooks/MyPageHook.js";
import useCookie from "../../hooks/useCookie.js";

const OrderDetail = ({ order }) => {
  const orderId = order?.orderId;
  const PhoneNumber = useCookie("PhoneNumber");
  const { fetchOrderDetail } = MyPageHook();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId).then(data => {
        setOrderDetail(data);
      });
    }
  }, [orderId]);

  if (!orderDetail) return <div>주문 정보가 없습니다.</div>;

  const {
    orderDate,
    firstAddress,
    secondAddress,
    requireMents,
    deliveryFee,
    paymentMethod,
    orderDetailItems,
  } = orderDetail;

  const totalPrice = orderDetailItems.reduce(
      (acc, item) => acc + item.orderPrice * item.quantity,
      0
  );

  const finalPrice = totalPrice + (deliveryFee || 0);

  return (
      <div className="order-detail-container">
        <div className="order-detail-header">
          <h1>주문 상세</h1>
          <span>{new Date(orderDate).toLocaleDateString() || "날짜 없음"}</span>
        </div>

        <div className="order-detail-section">
          {/* 배송 정보 */}
          <div className="order-detail-row">
            <div className="order-detail-label">배송</div>
            <div className="order-detail-value">
              {firstAddress} {secondAddress}
              <br/>
              전화번호 : {PhoneNumber}
              <br/>
              배송 요청사항: {requireMents || "없음"}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="order-detail-row">
            <div className="order-detail-label">상품 정보</div>
            <div className="order-detail-value">
              {orderDetailItems.map((item, idx) => (
                  <div className="order-detail-product" key={idx}>
                    <img
                        src={item.mainUrl}
                        alt={item.itemName}
                        className="order-detail-product-img"
                    />
                    <div>
                      <div className="order-detail-product-name">{item.itemName}</div>
                      <div className="order-detail-product-option">
                        {item.size || "사이즈 없음"} / {item.color || "색상 없음"}
                      </div>
                      <div className="order-detail-product-qty">
                        수량: {item.quantity}
                      </div>
                      <div className="order-detail-product-price">
                        {item.orderPrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="order-detail-row">
            <div className="order-detail-label">결제 정보</div>
            <div className="order-detail-value">
              <div className="order-detail-payment">
                <div>
                  <span>상품 총액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div>
                  <span>배송비</span>
                  <span>
                  {deliveryFee ? `${deliveryFee.toLocaleString()}원` : "무료배송"}
                </span>
                </div>
                <div>
                  <span>최종 결제 금액</span>
                  <span>{finalPrice.toLocaleString()}원</span>
                </div>
                <div>
                  <span>결제 수단</span>
                  <span>{paymentMethod || "결제수단 없음"}</span>
                </div>
                <div>
                  <span>받은 적립금</span>
                  <span>{order.point ?? 0}원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OrderDetail;
