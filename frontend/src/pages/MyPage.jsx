import { useState } from "react";
import OrderSection from "./MyPage/OrderSection";
import OrderHistory from "./MyPage/OrderHistory.jsx";
import PasswordChange from "./MyPage/PasswordChange.jsx";
import OrderDetail from "./MyPage/OrderDetail.jsx";
import Savings from "./MyPage/Savings.jsx";
import WishList from "./MyPage/WishList.jsx";
import Recent from "./MyPage/Recent.jsx";



const MyPage = () => {
    const [selectedTab, setSelectedTab] = useState("default");
    const [selectedOrder, setSelectedOrder] = useState(null);

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
            default:
                return (
                    <>
                        <div className="mypage-paymentTitle">
                            <h1>주문 처리 현황<span>(최근 3개월 기준)</span></h1>
                        </div>
                        <div className="mypage-paymentLine"/>
                        <div className="mypage-Tracker">
                            <div className="Tracker-first">
                                <h1>0</h1>
                                <h2>입금 전</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-second">
                                <h1>0</h1>
                                <h2>배송 준비중</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-Third">
                                <h1>0</h1>
                                <h2>배송중</h2>
                            </div>
                            <img src="/icons/mypage-Vector.svg" alt="Tracker-Vector" className="Tracker-Vector"/>
                            <div className="Tracker-Fourth">
                                <h1>0</h1>
                                <h2>배송 완료</h2>
                            </div>
                        </div>
                        <div className="mypage-paymentInfo">
                            <div className="paymentInfo-text">
                                <h1>취소 :</h1>
                                <span>0</span>
                            </div>
                            <div className="paymentInfo-text">
                                <h1>교환 :</h1>
                                <span>0</span>
                            </div>
                            <div className="paymentInfo-text" style={{borderRight: "none"}}>
                                <h1>반품 :</h1>
                                <span>0</span>
                            </div>
                        </div>
                        <h1 style={{marginTop: "40px"}}>주문내역 조회</h1>
                        <div className="mypage-paymentLine"/>
                        <div className="mypage-paymentArea">
                            <img src="/icons/mypage-noneIcon.svg" alt="noneIcon" className="mypage-NoneIcon"/>
                            <h1>주문 내역이 없습니다.</h1>
                            <div className="mypage-paymentLine2"/>
                        </div>
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
                            <h1>안녕하세요. 배호준님!</h1>
                            <h2>회원님의 회원등급은 <a>RED</a> 입니다.</h2>
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
                            <img src="/imgs/grade/red_grade.png" alt="usergrade" className="mypage-usergrade"/>
                            <a>RED</a>
                        </div>

                        <div className="mypage-mileage">
                            <img src="/icons/mypage-mileage.svg" alt="mileage-icon" className="mypage-mileage"/>
                            <h1>0 원</h1>
                            <h2>총 적립금</h2>
                        </div>

                        <div className="mypage-deliverly">
                            <img src="/icons/mypage-deliverly.svg" alt="deliverly-icon" className="mypage-deliverly"/>
                            <h1>0 회</h1>
                            <h2>총 주문횟수</h2>
                        </div>
                    </div>
                )}

                <div className="mypage-body">
                    <div className="mypage-tapBox">
                        <h1>나의 쇼핑 정보</h1>
                        <ul>
                            <li className={selectedTab === "OrderHistory" ? "selected" : ""} onClick={() => setSelectedTab("OrderHistory")} style={{marginTop: "15px"}}>주문내역 조회</li>
                            <li className={selectedTab === "Savings" ? "selected" : ""} onClick={() => setSelectedTab("Savings")}>적립금 내역</li>
                            <li>배송 주소록 관리</li>
                        </ul>

                        <h1 style={{marginTop: "40px"}}>활동 정보</h1>
                        <ul>
                            <li style={{marginTop: "15px"}} className={selectedTab === "Recent" ? "selected" : ""} onClick={() => setSelectedTab("Recent")}>최근 본 상품</li>
                            <li className={selectedTab === "WishList" ? "selected" : ""} onClick={() => setSelectedTab("WishList")}>나의 위시리스트</li>
                            <li>저장한 클라이밍 짐</li>
                        </ul>

                        <h1 style={{marginTop: "40px"}}>나의 정보</h1>
                        <ul>
                            <li style={{marginTop: "15px"}}>회원정보 수정</li>
                            <li className={selectedTab === "PasswordChange" ? "selected" : ""} onClick={() => setSelectedTab("PasswordChange")}>비밀번호 변경</li>
                            <li>회원 탈퇴</li>
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