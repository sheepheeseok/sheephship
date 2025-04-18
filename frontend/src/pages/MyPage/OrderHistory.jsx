import { useState, useEffect, useRef } from "react";

const OrderHistory = () => {
    const [orderTab, setOrderTab] = useState("order");
    const [selectedFilter, setSelectedFilter] = useState("오늘");
    const filters = ["오늘", "1개월", "3개월", "6개월"];
    const sliderRef = useRef(null);

    useEffect(() => {
        const index = filters.indexOf(selectedFilter);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${index * 100}%)`;
        }
    }, [selectedFilter]);

    return (
        <>
            <div className="mypage-paymentTitle">
                <h1>주문 조회</h1>
            </div>
            <div className="OrderHistory-Tab">
                <span className={orderTab === "order" ? "selected" : ""} onClick={() => setOrderTab("order")}>
                    주문내역 조회 (0)
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

                            {/* 선택된 필터 아래 슬라이드 효과 */}
                            <div className="filter-slider" ref={sliderRef} />
                        </div>
                        <div className="OrderContent-calender">
                            <input type="date" className="Order-calender"/>
                            <span>~</span>
                            <input type="date" style={{marginLeft: "10px"}} className="Order-calender"/>
                        </div>
                        <button className="OrderSearch-Btn">주문 조회</button>
                        <div className="OrderContent-descripe">
                            <h1>- 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 주문처리완료 후 36개월 이내의 주문내역을 조회하실 수 있습니다.</h1>
                            <h1>- 완료 후 36개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 리뉴얼 전에 주문한 내역은 [이전 주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 취소/교환/반품 신청은 주문 완료일 기준 7일까지 가능합니다</h1>
                        </div>
                        <div className="OrderContent-Line"/>
                        <h1 style={{marginTop: "10px"}}>주문 내역</h1>

                    </div>
                ) : (
                    <p>여기에 취소/반품/교환 내역 표시</p>
                )}
            </div>
        </>
    )
}

export default OrderHistory;