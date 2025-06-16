import { useState, useEffect } from "react";
import OrderSection from "./MyPage/OrderSection";
import OrderHistory from "./MyPage/OrderHistory.jsx";
import PasswordChange from "./MyPage/PasswordChange.jsx";
import OrderDetail from "./MyPage/OrderDetail.jsx";
import OrderCancel from "./MyPage/OrderCancel.jsx";
import Savings from "./MyPage/Savings.jsx";
import WishList from "./MyPage/WishList.jsx";
import Recent from "./MyPage/Recent.jsx";
import UserEdit from "./MyPage/UserEdit.jsx";
import UserOut from "./MyPage/UserOut.jsx";
import MyClimb from "./MyPage/MyClimb.jsx";
import DeliveryAddressForm from "./MyPage/DeliveryAddressForm.jsx";
import DeliveryAddressManagement from "./MyPage/DeliveryAddressManagement.jsx";
import MyPageHook from "../hooks/MyPageHook.js";


const MyPage = () => {
    const [selectedTab, setSelectedTab] = useState("default");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { members, userInfo, loading, error, loadMembers, loadCurrentUserInfo } = MyPageHook();
    const {
        orderQuoList,
        loadingOrderQuo,
        loadOrderQuoList,
        // ...기존 훅 값
    } = MyPageHook();

    useEffect(() => {
        loadMembers();
        loadCurrentUserInfo(); // ✅ 사용자 정보 불러오기
        loadOrderQuoList();
    }, []);

    console.log(orderQuoList);

    const [editingAddressId, setEditingAddressId] = useState(null);

    // 상태 추가
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);

    const gradeInfo = {
        RED: { discount: 0.03, image: "/imgs/grade/red_grade.png" },
        YELLOW: { discount: 0.05, image: "/imgs/grade/yellow_grade.png" },
        NAVY: { discount: 0.07, image: "/imgs/grade/navy_grade.png" },
        PURPLE: { discount: 0.09, image: "/imgs/grade/purple_grade.png" },
        BROWN: { discount: 0.12, image: "/imgs/grade/brown_grade.png" },
        BLACK: { discount: 0.15, image: "/imgs/grade/black_grade.png" },
    };

    const gradeColors = {
        RED: "#e74c3c",
        YELLOW: "#f1c40f",
        NAVY: "#34495e",
        PURPLE: "#9b59b6",
        BROWN: "#8e6e53",
        BLACK: "#000000",
    };

    const userGrade = userInfo?.grade?.toUpperCase(); // "RED" 등
    const gradeImage = gradeInfo[userGrade]?.image || "/imgs/grade/default.png";
    const gradeDiscount = gradeInfo[userGrade]?.discount || 0;
    const gradeColor = gradeColors[userGrade] || "#333";

    // 새 주소 추가 함수
    const handleAddAddress = (newAddress) => {
        setDeliveryAddresses((prev) => [...prev, newAddress]);
        setSelectedTab("DeliveryAddressManagement"); // 등록 후 탭 전환
    };


    const renderContent = () => {
        switch (selectedTab) {
            case "OrderHistory":
            case "Savings":
                return <OrderSection
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />;
            case "PasswordChange":
                return <PasswordChange/>;
            case "OrderDetail":
                return <OrderDetail order={selectedOrder} setSelectedTab={setSelectedTab} />;
            case "WishList":
                return <WishList/>;
            case "Recent":
                return <Recent/>;
            case "MyClimb":
                return <MyClimb/>;
            case "UserEdit":
                return <UserEdit/>;
            case "UserOut":
                return <UserOut/>;
            case "DeliveryAddressManagement":
                return <DeliveryAddressManagement
                    setSelectedTab={setSelectedTab}
                    deliveryAddresses={deliveryAddresses}
                    setEditingAddressId={setEditingAddressId}
                />;
            case "DeliveryAddressForm":
                return <DeliveryAddressForm
                    setSelectedTab={setSelectedTab}
                    onAddAddress={handleAddAddress}
                />;
            default:
                return (
                    <>
                        <div className="mypage-Tracker">
                            <div className="Tracker-first">
                                <h1>{orderQuoList?.beforeDepositCount ?? 0}</h1>
                                <h2>입금 전</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-second">
                                <h1>{orderQuoList?.cofirmCount ?? 0}</h1>
                                <h2>배송 준비중</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-Third">
                                <h1>{orderQuoList?.deliveriedCount ?? 0}</h1>
                                <h2>배송중</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-Fourth">
                                <h1>{orderQuoList?.pendingCount ?? 0}</h1>
                                <h2>배송 완료</h2>
                            </div>
                        </div>
                        <h1 style={{marginTop: "40px"}}>주문내역 조회</h1>
                        <div className="mypage-paymentLine"/>

                        {orderQuoList?.orderInquiryList?.length > 0 ? (
                            <div className="mypage-paymentArea-list">
                                {orderQuoList.orderInquiryList.map((order) => (
                                    <div key={order.orderId} className="mypage-order-card">
                                        <div className="mypage-paymentLine2" style={{marginTop: "0px"}}/>
                                        <div className="order-header">
                                            <h2>주문번호: {order.orderId}</h2>
                                            <span>{order.orderDate}</span>
                                        </div>
                                        <div
                                            className={`order-status-badge ${
                                                order.status === "CONFIRMED"
                                                    ? "status-confirmed"
                                                    : order.status === "PENDING"
                                                        ? "status-pending"
                                                        : order.status === "ON_DELIVERY"
                                                            ? "status-on_delivery"
                                                            : order.status === "BEFORE_DEPOSIT"
                                                                ? "status-BEFORE_DEPOSIT"
                                                                : ""
                                            }`}
                                        >
                                            <h1>주문상태</h1>
                                            {order.status === "CONFIRMED" && "배송 완료"}
                                            {order.status === "PENDING" && "배송 준비중"}
                                            {order.status === "ON_DELIVERY" && "배송중"}
                                            {order.status === "BEFORE_DEPOSIT" && "입금 전"}
                                        </div>

                                        <div className="order-items">
                                            {order.orderInquiryItemDtoList.map((item) => (
                                                <div key={item.orderItemId} className="order-item">
                                                    <img src={item.mainUrl} alt={item.name} className="item-thumb"/>
                                                    <div className="item-info">
                                                        <p className="item-name">{item.name}</p>
                                                        <p className="item-count">{item.quantity}개</p>
                                                        <p className="item-price">{item.orderPrice.toLocaleString()}원</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-total">
                                            <strong>
                                                총 결제금액:{" "}
                                                {order.orderInquiryItemDtoList
                                                    .reduce((sum, i) => sum + i.orderPrice * i.quantity, 0)
                                                    .toLocaleString()}
                                                원
                                            </strong>
                                        </div>

                                        <div className="mypage-paymentLine2" style={{marginTop: "20px"}}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mypage-paymentArea">
                                <img src="/icons/mypage-noneIcon.svg" alt="noneIcon" className="mypage-NoneIcon"/>
                                <h1>주문 내역이 없습니다.</h1>
                                <div className="mypage-paymentLine2"/>
                            </div>
                        )}
                    </>
                )
        }
    }
    const showUserInfo = selectedTab === "default";

    return (
        <div className="container">
            <div className="mypage-container">
                {showUserInfo && <h1>마이 페이지</h1>}
                {showUserInfo && (
                    <div className="mypage-userinfoBox">
                        <div className="mypage-userinfo">
                            <h1>안녕하세요. {userInfo?.name ?? "고객"}님!</h1>
                            <h2>회원님의 회원등급은 <a style={{ color: gradeColor}}>{userInfo?.grade ?? "일반"}</a> 입니다.</h2>
                        </div>
                        <div className="mypage-usergrade">
                            <div className="mypage-usergradeBox">
                                <h1 style={{marginRight: "3px"}}>회원등급</h1>
                                <div className="tooltip-container">
                                    <img src="/icons/info.svg" alt="info-icon" className="info-icon"
                                         style={{width: "25px", height: "25px", display: "flex"}}/>
                                    <div className="tooltip-box">
                                        <h1>등급별 할인</h1>
                                        <ul>
                                            <li><img src="/imgs/grade/red_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>
                                                RED 3%
                                            </li>
                                            <div className="grade-line"/>
                                            <li><img src="/imgs/grade/yellow_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>YELLOW 5%
                                            </li>
                                            <div className="grade-line"/>
                                            <li><img src="/imgs/grade/navy_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>
                                                NAVY 7%
                                            </li>
                                            <div className="grade-line"/>
                                            <li><img src="/imgs/grade/purple_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>
                                                PURPLE 9%
                                            </li>
                                            <div className="grade-line"/>
                                            <li><img src="/imgs/grade/brown_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>
                                                BROWN 12%
                                            </li>
                                            <div className="grade-line"/>
                                            <li><img src="/imgs/grade/black_grade.png" alt="grade-icon"
                                                     className="grade-icon"/>
                                                BLACK 15%
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <img src={gradeImage} alt="user-grade" className="mypage-usergrade"/>
                            <a style={{ color: gradeColor}}>{userGrade || "등급없음"}</a>
                        </div>
                    </div>
                )}

                <div className="mypage-body">
                    <div className="mypage-tapBox">
                        <h1>나의 쇼핑 정보</h1>
                        <ul>
                            <li style={{marginTop: "15px", cursor: "pointer"}} className={selectedTab === "OrderHistory" ? "selected" : ""} onClick={() => setSelectedTab("OrderHistory")}>주문내역 조회</li>
                            <li style={{cursor: "pointer"}} className={selectedTab === "Savings" ? "selected" : ""} onClick={() => setSelectedTab("Savings")}>적립금 내역</li>
                            <li style={{cursor: "pointer"}} className={selectedTab === "DeliveryAddressManagement" ? "selected" : ""} onClick={() => setSelectedTab("DeliveryAddressManagement")}>배송 주소록 관리</li>
                        </ul>

                        <h1 style={{marginTop: "40px"}}>활동 정보</h1>
                        <ul>
                            <li style={{marginTop: "15px", cursor: "pointer"}} className={selectedTab === "Recent" ? "selected" : ""} onClick={() => setSelectedTab("Recent")}>최근 본 상품</li>
                            <li style={{cursor: "pointer"}} className={selectedTab === "WishList" ? "selected" : ""} onClick={() => setSelectedTab("WishList")}>나의 위시리스트</li>
                        </ul>

                        <h1 style={{marginTop: "40px"}}>나의 정보</h1>
                        <ul>
                            <li style={{marginTop: "15px", cursor: "pointer"}} className={selectedTab === "UserEdit" ? "selected" : ""} onClick={() => setSelectedTab("UserEdit")}>회원정보 수정</li>
                            <li style={{cursor: "pointer"}} className={selectedTab === "PasswordChange" ? "selected" : ""} onClick={() => setSelectedTab("PasswordChange")}>비밀번호 변경</li>
                            <li style={{cursor: "pointer"}} className={selectedTab === "UserOut" ? "selected" : ""} onClick={() => setSelectedTab("UserOut")}>회원 탈퇴</li>
                        </ul>
                    </div>

                    <div className="mypage-paymentBox">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;