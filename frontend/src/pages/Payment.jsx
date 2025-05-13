import React, {useState} from "react";
import PaymentHook from "../hooks/PaymentHook.js";

const Payment = () => {
    const [activeTab, setActiveTab] = useState("manual");
    const [useSameAddress, setUseSameAddress] = useState(true); // 기본은 회원 정보와 동일로 설정
    const handleCheckboxChange = (value) => {
        if (value === 'same') {
            setUseSameAddress(true);
        } else {
            setUseSameAddress(false);
        }
    };
    const { processPayment } = PaymentHook();

    const [requestMessage, setRequestMessage] = useState("");
    const handleRequestChange = (e) => {
        setRequestMessage(e.target.value);
    };

    const [Addressselected, setAddressSelected] = useState("userAddress1");
    const addressSelect = (id) => {
        setAddressSelected(id);
    };

    const [bankPayment, setbankPayment] = useState("Bankreceipt");
    const BankPaymentSelect = (id) => {
        setbankPayment(id);
    };

    const [easyPayment, seteasyPayment] = useState("kakaopay");
    const EasyPaymentSelect = (id) => {
        seteasyPayment(id);
    };

    const [customMessage, setCustomMessage] = useState(false);
    const handleSelectChange = (event) => {
        setCustomMessage(event.target.value === "direct");
    };

    const [activeMethod, setActiveMethod] = useState(null);
    const toggleMethod = (method) => {
        setActiveMethod(activeMethod === method ? null : method);
    };

    const handleSubmit = () => {
        const paymentData = {
            paymentMethod: activeMethod,
            requireMents: requestMessage,
        };
        processPayment(paymentData);
    }

    return (
        <div className="container" style={{ alignItems:"start", flexDirection: "row"}}>
            <div className="payment-userInfobox">
                <h1>배송 정보</h1>
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
                                <div className="p-address-line" style={{marginTop: "40px"}}/>
                                <div className="p-recipient" onChange={handleSelectChange}>
                                    <h1 className="recent-h1" style={{whiteSpace: "nowrap"}}>요청 사항</h1>
                                    <select className="p-request-msg" style={{marginLeft: "25px"}}>
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
                                <div className="p-address-line"/>
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
                                                style={{width: "307px", padding: "10px"}}
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
                                        style={{marginLeft: "104.5px", width: "850px", padding: "10px"}}
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
                                        value={requestMessage} // 상태 값으로 바인딩
                                        onChange={handleRequestChange} // 입력값이 변경될 때마다 상태 업데이트
                                    />
                                )}
                                <div className="p-addressinfo-box" style={{ marginTop: "30px"}}>
                                    <input
                                        type="checkbox"
                                        id="Addressinfo"
                                    />
                                    <label htmlFor="Addressinfo">기본 배송지로 저장</label>
                                </div>

                                <div className="p-address-line"/>
                            </div>
                        )}
                    <div className="payment-box">
                        <h1 style={{marginTop: "25px"}}>결제 수단</h1>

                        <div className="payment-method-item">
                            <div className="payment-method-box">
                                <div className={`payment-method-easy ${activeMethod === "easy" ? "selected" : ""}`}
                                     onClick={() => toggleMethod("easy")} style={{marginTop: "22px"}}>
                                    간편 결제
                                </div>
                                {activeMethod === "easy" && (
                                    <div className="payment-method-detail">
                                        <div className="p-checkbox-area" style={{marginLeft: "10px", gap: "45px"}}>
                                            {/* 회원 정보와 동일 체크박스 */}
                                            <div className="p-checkbox-box">
                                                <input
                                                    type="checkbox"
                                                    id="kakaopay"
                                                    checked={easyPayment === "kakaopay"}
                                                    onChange={() => EasyPaymentSelect("kakaopay")}
                                                    className="custom-checkbox"
                                                />
                                                <div className="easy-payment-label">
                                                    <img style={{marginLeft: "5px"}}
                                                         src="/imgs/payment/kakaopay.png"/>
                                                    <label htmlFor="kakaopay">카카오 페이</label>
                                                </div>
                                            </div>

                                            <div className="p-checkbox-box">
                                                <input
                                                    type="checkbox"
                                                    id="tosspay"
                                                    checked={easyPayment === "tosspay"}
                                                    onChange={() => EasyPaymentSelect("tosspay")}
                                                    className="custom-checkbox"
                                                />
                                                <div className="easy-payment-label">
                                                    <img style={{marginLeft: "5px"}}
                                                         src="/imgs/payment/tosspay.png"/>
                                                    <label htmlFor="tosspay">토스 페이</label>
                                                </div>
                                            </div>

                                            <div className="p-checkbox-box">
                                                <input
                                                    type="checkbox"
                                                    id="naverpay"
                                                    checked={easyPayment === "naverpay"}
                                                    onChange={() => EasyPaymentSelect("naverpay")}
                                                    className="custom-checkbox"
                                                />
                                                <div className="easy-payment-label">
                                                    <img style={{marginLeft: "5px"}}
                                                         src="/imgs/payment/naverpay.png"/>
                                                    <label htmlFor="naverpay">네이버 페이</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className={`payment-method-easy ${activeMethod === "card" ? "selected" : ""}`}
                                     onClick={() => toggleMethod("card")}
                                     style={{marginTop: "6px"}}>
                                    카드 결제
                                </div>
                                {activeMethod === "card" && (
                                    <div className="payment-method-detail" style={{marginTop: "20px"}}>

                                        <div className="card-payment-box">
                                            <h1 style={{marginRight: "17px"}}>카드 번호</h1>
                                            <input type="text" name="firstCardNum" className="card-payment-input"/>
                                            <input type="text" name="SecondCardNum" className="card-payment-input"/>
                                            <input type="text" name="ThirdCardNum" className="card-payment-input"/>
                                            <input type="text" name="FourthCardNum" className="card-payment-input"/>
                                        </div>
                                        <div className="card-payment-box" style={{marginTop: "28px"}}>
                                            <h1 style={{marginRight: "17px"}}>유효 기간</h1>
                                            <input type="text" name="firstCardYearNum" placeholder="MM"
                                                   className="card-payment-input"/>
                                            <input type="text" name="SecondCardYearNum" placeholder="YY"
                                                   className="card-payment-input"/>
                                        </div>
                                        <div className="card-payment-box" style={{marginTop: "28px"}}>
                                            <h1 style={{marginRight: "17px", width: "78px"}}>CVC</h1>
                                            <input type="text" name="CardCVC" placeholder="3자리"
                                                   className="card-payment-input"/>
                                        </div>
                                        <div className="card-payment-box" style={{marginTop: "28px"}}>
                                            <h1 style={{marginRight: "17px", width: "78px"}}>비밀번호</h1>
                                            <input type="password" name="CardPassword" maxLength="2"
                                                   placeholder="앞 2자리"
                                                   className="card-payment-input"/>
                                        </div>
                                    </div>
                                )}
                                <div className={`payment-method-easy ${activeMethod === "bank" ? "selected" : ""}`}
                                     onClick={() => toggleMethod("bank")}
                                     style={{marginTop: "6px"}}>
                                    무통장 입금
                                </div>
                                {activeMethod === "bank" && (
                                    <div className="payment-method-detail" style={{marginTop: "30px"}}>
                                        <div className="card-payment-box">
                                            <h1 style={{marginLeft: "20px", marginRight: "20px"}}>입금 은행</h1>
                                            <h1>국민 439020-01-454679</h1>
                                        </div>

                                        <div className="card-payment-box"
                                             style={{marginTop: "15px", height: "60px"}}>
                                            <h1 style={{marginLeft: "20px"}}>입금자명</h1>
                                            <input type="password" name="bankSendName"
                                                   className="bank-payment-input" style={{marginLeft: "20px"}}/>
                                        </div>
                                        <h1 style={{marginLeft: "27px", marginTop:"10px", fontFamily: "NotoSansKR-Light",
                                            fontSize: "22px", color: "red"}}>※입금자와 입금자명이 다를시 결제 확인이 불가능 합니다.</h1>
                                        <h1 style={{marginLeft: "20px", marginTop: "20px", fontFamily: "NotoSansKR-Bold", fontSize: "20px"}}>현금 영수증</h1>

                                        <div className="card-payment-box" style={{marginTop: "10px"}}>
                                            <div className="p-checkbox-box" style={{marginLeft: "16px"}}>
                                                <input
                                                    type="checkbox"
                                                    id="Bankreceipt"
                                                    checked={bankPayment === "Bankreceipt"}
                                                    onChange={() => BankPaymentSelect("Bankreceipt")}
                                                    className="custom-checkbox"/>
                                                <div className="easy-payment-label">
                                                    <label htmlFor="Bankreceipt">현금영수증 신청</label>
                                                </div>
                                            </div>

                                            <div className="p-checkbox-box" style={{marginLeft: "16px"}}>
                                                <input
                                                    type="checkbox"
                                                    id="Banknoreceipt"
                                                    checked={bankPayment === "Banknoreceipt"}
                                                    onChange={() => BankPaymentSelect("Banknoreceipt")}
                                                    className="custom-checkbox"
                                                />
                                                <div className="easy-payment-label">
                                                    <label htmlFor="Banknoreceipt">신청 안함</label>
                                                </div>
                                            </div>
                                        </div>
                                        {bankPayment === "Bankreceipt" && (
                                            <div className="cash-receipt-box">
                                                <select
                                                    className="cash-receipt-select"
                                                    style={{
                                                        width: "170px",
                                                        padding: "8px",
                                                        marginRight: "15px",
                                                        borderRadius: "4px",
                                                        border: "1px solid #ccc",
                                                        fontFamily: "NotoSansKR-Regular",
                                                    }}
                                                >
                                                    <option value="personal">개인</option>
                                                    <option value="business">기업</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    placeholder="휴대폰 번호 또는 사업자 번호"
                                                    className="cash-receipt-input"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-addressinfo-box">
                            <input
                                type="checkbox"
                                id="SavePaymentinfo"
                            />
                            <label htmlFor="SavePaymentinfo">결제수단과 입력정보를 다음에도 사용</label>
                        </div>

                        <button className="payment-end-box" onClick={handleSubmit}>
                            48,500원 결제
                        </button>

                        <ul className="payment-end-detail">
                            <li>무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다. 무이자할부를
                                원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.
                            </li>
                            <li>최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="payment-productBox">
                <h1>구매 상품</h1>
                <div className="payment-product-info">
                    <img src="/imgs/products/2-pants(1).jpg" alt="payment-product"
                         className="payment-product"/>
                    <div className="payment-product-detail">
                        <h1 style={{marginBottom: "5px"}}>Stealth XPAC™ Deluxe Chalk Bucket- Mag Closure</h1>
                        <h2>사이즈 : L</h2>
                        <h2 style={{marginTop: "5px"}}>수량: 1개</h2>
                        <h2 style={{marginTop: "5px"}}>컬러 : GRAY</h2>
                        <h1 style={{
                            textAlign: "end",
                            marginRight: "10px",
                            fontSize: "30px",
                            marginTop: "35px"
                        }}>50,000원</h1>
                    </div>
                </div>

                <div className="payment-deliverly-price">
                    <h1>배송비</h1>
                    <h1>없음</h1>
                </div>
                <div className="p-address-line" style={{ marginTop: "10px", marginBottom: "35px"}}/>

                <h1 style={{ fontFamily: "NotoSansKR-Medium", marginLeft: "37px", marginBottom: "10px"}}>결제 정보</h1>
                <div className="payment-product-price">
                    <h1>주문상품</h1>
                    <h1>50,000원</h1>
                </div>
                <div className="payment-product-price">
                    <h1>배송비</h1>
                    <h1>없음</h1>
                </div>
                <div className="p-address-line" style={{ marginBottom: "15px"}}/>
                <div className="payment-product-price">
                    <div className="payment-grade-info">
                        <h1>등급 할인</h1>
                        <div className="info-tooltip-container">
                            <img
                                src="/icons/info.svg"
                                alt="info-icon"
                                className="info-icon"
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                }}
                            />
                            <div className="info-tooltip-box">
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
                        <h2 style={{marginTop: "13px"}}>나의 등급 : </h2>
                        <img
                            src="/imgs/grade/red_grade.png"
                            alt="grade-icon"
                            className="grade-icon"
                            style={{marginTop: "2px", marginLeft: "5px"}}
                        />
                    </div>
                    <h1 style={{color: "#FF5F5F"}}>-1,500원</h1>
                </div>
                <div className="p-address-line" style={{ marginTop: "30px", marginBottom: "20px"}}/>
                <div className="p-result-box">
                    <div className="p-result-price">
                        <h1 style={{fontSize: "24px"}}>최종 결제 금액</h1>
                        <h1 style={{fontSize: "32px", marginTop: "7px"}}>48,500원</h1>
                    </div>
                    <div className="p-result-price" style={{ marginTop: "10px"}}>
                        <h2 style={{marginBottom: "2px"}}>적립 예정금액</h2>
                        <h2 style={{fontSize: "24px"}}>485원</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;