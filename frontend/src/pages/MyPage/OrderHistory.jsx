import { useState, useEffect, useRef } from "react";
import OrderContentCard from "../../component/OrderContentCard";
import MyPageHook from "../../hooks/MyPageHook.js";

const OrderHistory = ({ setSelectedTab, orders, setOrders, setSelectedOrder }) => {
    const {
        orderList,
        loading,
        error,
        reloadOrderList,
        cancelOrder,
        loadCancelOrderList,
    } = MyPageHook();
    const [orderTab, setOrderTab] = useState("order");
    const [selectedFilter, setSelectedFilter] = useState("오늘");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const sliderRef = useRef(null);
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");
    console.log(orderList);

    const [orderCount, setOrderCount] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

    const filters = ["오늘", "1개월", "3개월", "6개월"];

    const calculateDateRange = (filter) => {
        const end = new Date();
        const start = new Date();

        switch (filter) {
            case "오늘":
                end.setDate(end.getDate() + 1);
                break;
            case "1개월":
                start.setMonth(start.getMonth() - 1);
                break;
            case "3개월":
                start.setMonth(start.getMonth() - 3);
                break;
            case "6개월":
                start.setMonth(start.getMonth() - 6);
                break;
            default:
                break;
        }

        const format = (date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        };

        return { startDate: format(start), endDate: format(end) };
    };

    useEffect(() => {
        const { startDate, endDate } = calculateDateRange(selectedFilter);

        if (orderTab === "order") {
            reloadOrderList(startDate, endDate).then((res) => {
                const count = res?.flatMap(order => order.orderInquiryItemDtoList || []).length || 0;
                setOrderCount(count);
            });
        }

        if (orderTab === "returns") {
            loadCancelOrderList().then((res) => {
                const count = res?.flatMap(order => order.orderInquiryItemDtoList || []).length || 0;
                setCancelCount(count);
            });
        }
    }, [orderTab, selectedFilter]);



    useEffect(() => {
        const count = orderList?.flatMap(order => order.orderInquiryItemDtoList || []).length || 0;
        if (orderTab === "returns") {
            setCancelCount(count);
        } else {
            setOrderCount(count);
        }
    }, [orderList, orderTab]);


    useEffect(() => {
        const index = filters.indexOf(selectedFilter);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${index * 100}%)`;
        }
    }, [selectedFilter]);


    const flattenedOrders = orderList
        .filter(order => {
            if (orderTab === "order") {
                return order.status === "CONFIRMED" || order.status === "ORDER";
            } else if (orderTab === "returns") {
                return order.status === "CANCLE" || order.status === "RETURN" || order.status === "EXCHANGE";
            }
            return false;
        })
        .flatMap(order =>
            order.orderInquiryItemDtoList.map(item => ({
                orderId: order.orderId,
                image: item.mainUrl,
                name: item.name,
                price: item.orderPrice ?? 0,
                quantity: item.quantity,
                orderDate: order.orderDate,
                fullOrder: order,
            }))
        );


    const totalPages = Math.ceil(flattenedOrders.length / ordersPerPage);

    const startIndex = (currentPage - 1) * ordersPerPage;
    const currentOrders = flattenedOrders.slice(startIndex, startIndex + ordersPerPage);

    return (
        <>
            <div className="mypage-OrderHistory-Title">
                <h1>주문 조회</h1>
            </div>

            <div className="OrderHistory-Tab">
                <span className={orderTab === "order" ? "selected" : ""} onClick={() => setOrderTab("order")}>
                    주문내역 조회 ({orderCount})
                </span>
                <span className={orderTab === "returns" ? "selected" : ""} onClick={() => setOrderTab("returns")}>
                    취소/반품/교환 내역 ({cancelCount})
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
                            <div className="filter-slider" ref={sliderRef}/>
                        </div>

                        <div className="OrderContent-calender">
                            <input
                                type="date"
                                className="Order-calender"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                            />
                            <span>~</span>
                            <input
                                type="date"
                                style={{marginLeft: "10px"}}
                                className="Order-calender"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                            />
                        </div>

                        <button
                            className="OrderSearch-Btn"
                            onClick={() => {
                                if (customStartDate && customEndDate) {
                                    reloadOrderList(customStartDate, customEndDate);
                                } else {
                                    alert("시작일과 종료일을 모두 선택하세요.");
                                }
                            }}
                        >
                            주문 조회
                        </button>

                        <div className="OrderContent-descripe">
                            <h1>- 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 주문처리완료 후 36개월 이내의 주문내역을 조회하실 수 있습니다.</h1>
                            <h1>- 완료 후 36개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 리뉴얼 전에 주문한 내역은 [이전 주문내역]에서 확인할 수 있습니다.</h1>
                            <h1>- 취소/교환/반품 신청은 주문 완료일 기준 7일까지 가능합니다</h1>
                        </div>

                        <div className="OrderContent-Line"/>
                        <h1 style={{marginTop: "10px"}}>주문 내역</h1>

                        {/* 주문 카드 렌더링 */}
                        {currentOrders.map((item, index) => (
                            <OrderContentCard
                                key={`${item.orderId}-${index}`}
                                type={orderTab === "order" ? "order" : "cancel"}
                                product={{
                                    orderId: item.orderId,
                                    date: item.orderDate ?? "날짜 없음",
                                    image: item.image,
                                    name: item.name,
                                    price: item.price,
                                    quantity: item.quantity,
                                }}
                                onDetailClick={() => {
                                    setSelectedOrder(item.fullOrder); // 전체 주문 전달
                                    setTimeout(() => setSelectedTab("OrderDetail"), 0);
                                }}
                                onCancelClick={async (product) => {
                                    try {
                                        const confirmCancel = window.confirm("정말 주문을 취소하시겠습니까?");
                                        if (!confirmCancel) return;

                                        const orderId = product.orderId;
                                        const orderItemIds = item.fullOrder.orderInquiryItemDtoList.map(i => i.orderItemId); // 또는 선택 항목만
                                        await cancelOrder(orderId, orderItemIds);
                                        alert("주문이 취소되었습니다.");
                                        // 필요시 목록 다시 불러오기
                                    } catch (err) {
                                        console.error("에러 발생:", err);
                                    }
                                }}
                            />
                        ))}

                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className="orderh-pagination">
                                {Array.from({length: totalPages}).map((_, i) => (
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
                                ※ 주문취소는 배송 전 상태에서만 가능합니다.<br/>
                                ※ 상품 수령(배송완료) 후 7일 이내 교환/반품 신청이 가능합니다. 단, 상품에 착용 흔적이나 훼손이 있을 경우 불가합니다.<br/>
                                ※ 상품의 교환/반품은 Q&A 또는 고객센터(카카오 채널)를 통해 접수 후 처리해드립니다.<br/>
                                ※ 비회원 주문의 경우 [비회원 주문조회]를 통해 접수해 주세요.<br/>
                                ※ 취소/교환/반품 신청은 마이페이지 &gt; 주문내역에서만 가능합니다.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="order-Content">
                        <h2 style={{ marginBottom: "16px" }}>취소/반품/교환 내역</h2>

                        {currentOrders.length === 0 ? (
                            <p>해당 내역이 없습니다.</p>
                        ) : (
                            currentOrders.map((item, index) => (
                                <OrderContentCard
                                    key={`${item.orderId}-${index}`}
                                    product={{
                                        orderId: item.orderId,
                                        date: item.orderDate ?? "날짜 없음",
                                        image: item.image,
                                        name: item.name,
                                        price: item.price,
                                        quantity: item.quantity,
                                    }}
                                    onDetailClick={() => {
                                        setSelectedOrder(item.fullOrder);
                                        setTimeout(() => setSelectedTab("OrderDetail"), 0);
                                    }}
                                    onCancelClick={() => {}}
                                />
                            ))
                        )}

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
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderHistory;
