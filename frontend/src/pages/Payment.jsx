import React, {useState} from "react";

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

    const [Addressselected, setAddressSelected] = useState("userAddress1");
    const addressSelect = (id) => {
        setAddressSelected(id);
    };

    const [customMessage, setCustomMessage] = useState(false);

    const handleSelectChange = (event) => {
        setCustomMessage(event.target.value === "direct");
    };


    return (<div className="container">
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
                                    <div className="p-recent-address">
                                        <input
                                            type="checkbox"
                                            id="userAddress1"
                                            className="custom-checkbox"
                                            checked={Addressselected === "userAddress1"}
                                            onChange={() => addressSelect("userAddress1")}
                                        />
                                        <div className="p-userAddress-box">
                                            <label htmlFor="userAddress1">배호준</label>
                                            <h1>서울특별시 송파구 마천동 123-45 영대빌라 4동 201호</h1>
                                            <h1>010-1234-5678</h1>
                                        </div>
                                    </div>
                                    <div className="p-recent-address">
                                        <input
                                            type="checkbox"
                                            id="userAddress2"
                                            className="custom-checkbox"
                                            checked={Addressselected === "userAddress2"}
                                            onChange={() => addressSelect("userAddress2")}
                                        />
                                        <div className="p-userAddress-box">
                                            <label htmlFor="userAddress2">양희석</label>
                                            <h1>경기도 광역시 성남시 롯데캐슬 101동 201호</h1>
                                            <h1>010-5782-1234</h1>
                                        </div>
                                    </div>
                                    <div className="p-address-line" style={{marginTop: "54px"}}/>
                                    <div className="p-recipient" onChange={handleSelectChange}>
                                        <h1 className="recent-h1" style={{whiteSpace: "nowrap"}}>요청 사항</h1>
                                        <select className="p-request-msg">
                                            <option value="">--메세지 선택-- (선택사항)</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="daum.net">daum.net</option>
                                            <option value="direct">직접 입력</option>
                                        </select>
                                    </div>
                                    {customMessage && (
                                        <textarea
                                            className="p-request-area2"
                                            placeholder="요청 사항을 입력하세요."
                                        />
                                    )}

                                    <div className="p-addressinfo-box">
                                        <input
                                            type="checkbox"
                                            id="Addressinfo"
                                        />
                                        <label htmlFor="Addressinfo">기본 배송지로 저장</label>
                                    </div>
                                    <div className="payment-line" style={{marginBottom: "0"}}></div>
                                </div>
                            )
                            : (
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
                                        <h1 style={{whiteSpace: "nowrap"}}>이메일</h1>
                                        <div className="p-email-formbox">
                                            <input
                                                type="text"
                                                name="recipient"
                                                className="p-email-form"
                                            />

                                            <span>@</span>

                                            <select className="p-select-box">
                                                <option value="">도메인 선택</option>
                                                <option value="gmail.com">gmail.com</option>
                                                <option value="naver.com">naver.com</option>
                                                <option value="daum.net">daum.net</option>
                                                <option value="direct">직접 입력</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-address-line"/>

                                <div className="p-address-form">
                                    <div className="p-recipient">
                                        <h1 style={{whiteSpace: "nowrap"}}>요청 사항</h1>
                                        <select className="p-request-msg" onChange={handleSelectChange}>
                                            <option value="">--메세지 선택-- (선택사항)</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="daum.net">daum.net</option>
                                            <option value="direct">직접 입력</option>
                                        </select>
                                    </div>
                                </div>
                                    {customMessage && (
                                        <textarea
                                            className="p-request-area"
                                            placeholder="요청 사항을 입력하세요."
                                        />
                                    )}
                                <div className="p-addressinfo-box">
                                    <input
                                        type="checkbox"
                                        id="Addressinfo"
                                    />
                                    <label htmlFor="Addressinfo">기본 배송지로 저장</label>
                                </div>

                                <div className="payment-line" style={{marginBottom: "0"}}></div>
                            </div>
                        )}
                        <div className="payment-box">
                            <h1>주문상품</h1>
                            <div className="payment-product-info">
                                <img src="/imgs/payment/payment-product1.png" alt="payment-product"
                                     className="payment-product"/>
                                <div className="payment-product-detail">
                                    <h1>Stealth XPAC™ Deluxe Chalk Bucket- Mag Closure</h1>
                                    <h2 style={{marginTop: "20px"}}>수량: 1개</h2>
                                    <h1 style={{marginTop: "35px"}}>50,000원</h1>
                                </div>
                            </div>

                            <div className="payment-deliverly-price">
                                <h1>배송비</h1>
                                <h1>없음</h1>
                            </div>

                            <h1>결제 정보</h1>
                            <div className="payment-product-price">
                                <h1>주문상품</h1>
                                <h1>50,000원</h1>
                            </div>
                            <div className="payment-product-price">
                                <h1>배송비</h1>
                                <h1>없음</h1>
                            </div>
                            <div className="payment-product-price">
                                <div className="payment-grade-info">
                                    <h1>등급 할인</h1>
                                        <img src="/icons/info.svg" alt="info-icon" className="info-icon"
                                             style={{
                                                 width: "25px",
                                                 height: "25px",
                                                 display: "flex",
                                                 marginTop: "16px"
                                             }}/>
                                        <h2>나의 등급 : </h2>
                                        <img src="/imgs/grade/red_grade.png" alt="grade-icon" className="grade-icon"
                                             style={{marginTop: "18px", marginLeft: "5px"}}/>
                                </div>
                                <h1 style={{color: "#FF5F5F"}}>-1,500원</h1>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
    </div>)
}

export default Payment;