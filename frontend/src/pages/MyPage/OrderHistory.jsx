import { useState, useEffect, useRef } from "react";
import OrderContentCard from "../../component/OrderContentCard";

const OrderHistory = ({ setSelectedTab, orders, setOrders, setSelectedOrder }) => {
    const [orderTab, setOrderTab] = useState("order");
    const [selectedFilter, setSelectedFilter] = useState("오늘");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const sliderRef = useRef(null);

    const filters = ["오늘", "1개월", "3개월", "6개월"];

    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

    useEffect(() => {
        const index = filters.indexOf(selectedFilter);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${index * 100}%)`;
        }
    }, [selectedFilter]);

    return (
        <>
            <div className="mypage-OrderHistory-Title">
                <h1>주문 조회</h1>
            </div>

            <div className="OrderHistory-Tab">
                <span className={orderTab === "order" ? "selected" : ""} onClick={() => setOrderTab("order")}>
                    주문내역 조회 ({orders.length})
                </span>
                <span className={orderTab === "returns" ? "selected" : ""} onClick={() => setOrderTab("returns")}>
                    취소/반품/교환 내역 (0)
                </span>
            </div>

            <div className="OrderHistory-Content">
                {orderTab === "order" ? (
                    <div className="order-Content">
                        <div className="OrderContent-filter">
                            {filters.map((filter, index) => (
                                <div
                                    key={index}
                                    className={`Orderfilter-option ${selectedFilter === filter ? "selected" : ""}`}
                                    onClick={() => setSelectedFilter(filter)}
                                >
                                    <h1>{filter}</h1>
                                </div>
                            ))}
                            <div className="filter-slider" ref={sliderRef} />
                        </div>

                        <div className="OrderContent-calender">
                            <input type="date" className="Order-calender" />
                            <span>~</span>
                            <input type="date" style={{ marginLeft: "10px" }} className="Order-calender" />
                        </div>

                        <button className="OrderSearch-Btn">주문 조회</button>

                        <div className="OrderContent-descripe">
                            <h1>- 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 주문처리완료 후 36개월 이내의 주문내역을 조회하실 수 있습니다.</h1>
                            <h1>- 완료 후 36개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 리뉴얼 전에 주문한 내역은 [이전 주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 취소/교환/반품 신청은 주문 완료일 기준 7일까지 가능합니다</h1>
                        </div>

                        <div className="OrderContent-Line" />
                        <h1 style={{ marginTop: "10px" }}>주문 내역</h1>

                        {/* 주문 카드 렌더링 */}
                        {currentOrders.map((order, index) => (
                             <OrderContentCard
                                key={order.id || index}
                                product={order}
                                onDetailClick={(orderObj) => {
                                    setSelectedOrder(orderObj); // 선택된 주문 저장
                                    setTimeout(() => setSelectedTab("OrderDetail"), 0); // 탭 전환
                                }}
                            />
                        ))}

                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className="orderh-pagination">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={currentPage === i + 1 ? "page-number active" : "page-number"}
                                        onClick={() => setCurrentPage(i + 1)}
                                        style={{
                                            margin: "0 8px",
                                            cursor: "pointer",
                                            fontWeight: currentPage === i + 1 ? "bold" : "normal",
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                ))}
                            </div>
                        )}


                        {/* 안내문구 */}
                        <div className="OrderNotice">
                            <p>
                                ※ 주문취소는 배송 전 상태에서만 가능합니다.<br />
                                ※ 상품 수령(배송완료) 후 7일 이내 교환/반품 신청이 가능합니다. 단, 상품에 착용 흔적이나 훼손이 있을 경우 불가합니다.<br />
                                ※ 상품의 교환/반품은 Q&A 또는 고객센터(카카오 채널)를 통해 접수 후 처리해드립니다.<br />
                                ※ 비회원 주문의 경우 [비회원 주문조회]를 통해 접수해 주세요.<br />
                                ※ 취소/교환/반품 신청은 마이페이지 &gt; 주문내역에서만 가능합니다.
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>여기에 취소/반품/교환 내역 표시</p>
                )}
            </div>
        </>
    );
};

export default OrderHistory;
