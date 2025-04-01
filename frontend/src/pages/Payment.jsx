import { useState } from "react";

const Payment = () => {
    const [activeTab, setActiveTab] = useState("manual"); // 기본값: 최근 배송지
    const [useSameAddress, setUseSameAddress] = useState(true); // 기본은 회원 정보와 동일로 설정
    const handleCheckboxChange = (value) => {
        if (value === 'same') {
            setUseSameAddress(true);
        } else {
            setUseSameAddress(false);
        }
    };

    return (
        <div className="container">
            <div className="payment-container">
                <div className="payment-header">
                    <h1>주문/결제</h1>
                </div>
                <div className="payment-line"/>
                <div className="p-address-box">
                    <div className="p-address-title">
                        <h1>배송지</h1>
                    </div>
                    <div className="p-address-tap">
                        <button
                            className={activeTab === "recent" ? "active" : ""}
                            onClick={() => setActiveTab("recent")}
                        >
                            최근 배송지
                        </button>
                        <button
                            className={activeTab === "manual" ? "active" : ""}
                            onClick={() => setActiveTab("manual")}
                        >
                            직접 입력
                        </button>
                    </div>
                    <div className="p-address-content">
                        {activeTab === "recent" ? (
                            <div className="p-recent-box">

                            </div>
                        ) : (
                            <div className="p-manual-box">
                                <div className="p-checkbox-area">
                                {/* 회원 정보와 동일 체크박스 */}
                                <div className="p-checkbox-box">
                                    <input
                                        type="checkbox"
                                        id="sameAddress"
                                        checked={useSameAddress}
                                        onChange={() => handleCheckboxChange('same')}
                                        className="custom-checkbox"
                                    />
                                    <label htmlFor="sameAddress">회원 정보와 동일</label>
                                </div>

                                {/* 새로운 배송지 체크박스 */}
                                <div className="p-checkbox-box">
                                    <input
                                        type="checkbox"
                                        id="newAddress"
                                        checked={!useSameAddress}
                                        onChange={() => handleCheckboxChange('new')}
                                        className="custom-checkbox"
                                    />
                                    <label htmlFor="newAddress">새로운 배송지</label>
                                </div>
                                </div>

                                {/* 배송지 입력 폼 */}
                                <div className="p-address-form">
                                    <div className="p-recipient" style={{marginTop: "32px"}}>
                                        <h1>받는사람</h1>
                                        <input
                                            type="text"
                                            name="recipient"
                                        />
                                    </div>
                                    <div className="p-recipient">
                                        <h1>주소</h1>
                                        {/* 주소 입력 칸 1: 기본 주소 */}
                                        <div className="p-address-formbox">
                                            <input
                                                style={{width: "307px"}}
                                                type="text"
                                                readOnly
                                                placeholder="주소"
                                            />
                                            <button
                                                type="button"
                                                className="p-address-btn"
                                            >
                                                주소검색
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="detailAddress"
                                        placeholder="상세 주소"
                                        style={{marginLeft: "104.5px"}}
                                    />
                                    <div className="p-recipient">
                                        <h1 style={{whiteSpace: "nowrap"}}>휴대전화</h1>
                                        <div className="p-phone-box">
                                            <input
                                                type="text"
                                                name="phoneFirst"
                                                maxLength="3" // 첫 번째 부분은 3자리만 입력
                                                className="p-phone-input"
                                            />
                                            <span>-</span>
                                            <input
                                                type="text"
                                                name="phoneMiddle"
                                                maxLength="4" // 두 번째 부분은 4자리
                                                className="p-phone-input"
                                            />
                                            <span>-</span>
                                            <input
                                                type="text"
                                                name="phoneLast"
                                                maxLength="4" // 세 번째 부분은 4자리
                                                className="p-phone-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-recipient">
                                        <h1>이메일</h1>
                                        <input
                                            type="text"
                                            name="recipient"
                                        />
                                    </div>
                                </div>
                            </div>


                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;