import React from "react";

const OrderDetail = () => {
    return (
        <div className="order-detail-container">
            <h1 className="order-detail-title">주문 상세</h1>
            <div className="order-detail-section">
                <div className="order-detail-info-left">
                    <p><strong>나의 쇼핑 정보</strong></p>
                    <p>주문번호 조회</p>
                    <p>취소/반품/교환 조회</p>
                    <p>쿠폰 조회</p>
                    <p>적립금 조회</p>
                </div>
                <div className="order-detail-info-right">
                    <div className="order-detail-row">
                        <span className="order-detail-label">주문 날짜</span>
                        <span className="order-detail-value">25.03.01</span>
                    </div>
                    <div className="order-detail-row">
                        <span className="order-detail-label">배송</span>
                        <span className="order-detail-value">서울시 성북구 예림당길 123-34 명희빌라 010-***-2484</span>
                    </div>
                    <div className="order-detail-product">
                        <img src="https://sheephship.com/web/upload/NNEditor/20240307/0075_BLACK.png" alt="product" className="order-detail-image" />
                        <div>
                            <p className="order-detail-product-name">Stealth XPAC™ Deluxe Chalk Bucket · Mag Closure</p>
                            <p className="order-detail-product-price">45,000원</p>
                        </div>
                    </div>
                    <div className="order-detail-summary">
                        <div className="order-detail-row"><span>주문금액</span><span>50,000원</span></div>
                        <div className="order-detail-row"><span>배송비</span><span>무료배송</span></div>
                        <div className="order-detail-row"><span>할인 금액</span><span>-1,500원</span></div>
                        <div className="order-detail-row total"><span>최종 결제 금액</span><span>48,500원</span></div>
                        <div className="order-detail-row"><span>받은 적립금</span><span>480원</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
