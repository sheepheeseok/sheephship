import { useState } from "react";
import useForm from "../hooks/SignupHook";
import axios from "axios";

const Signup = () => {
    const {
        formData,
        setFormData,
        handleChange,
        handleDomainChange,
        handleConsentChange,
        handleAddressSearch,
        handleSubmit,
        passwordMatchError,
    } = useForm();

    const [response, setResponse] = useState(null);

    return (
        <div className="container">
            <div className="Signup-container">
                <h1>회원가입</h1>
                <form onSubmit={(e) => handleSubmit(e, axios, setResponse)}>
                    <h2>아이디</h2>
                    <input type="ID" className="Signup-input" value={formData.userId}
                           onChange={(e) => setFormData({...formData, userId: e.target.value})}
                           placeholder="영문, 숫자 5자 이상 입력해주세요."/>
                    <h2>이메일</h2>
                    <div className="signup-email-box" style={{display: "flex", alignItems: "center"}}>
                        <input
                            type="text"
                            className="Signup-input"
                            value={formData.domain === "direct" ? `${formData.email}@${formData.customDomain}` : formData.email}
                            onChange={(e) => {
                                if (formData.domain === "direct") {
                                    // 'direct'인 경우 email과 customDomain을 분리하여 업데이트
                                    const emailParts = e.target.value.split('@');
                                    setFormData({
                                        ...formData,
                                        email: emailParts[0],
                                        customDomain: emailParts[1] || ''
                                    });
                                } else {
                                    setFormData({...formData, email: e.target.value});
                                }
                            }}
                            placeholder={formData.domain === "direct" ? "이메일 전체 입력 (example@gmail.com)" : "이메일 아이디"}
                            style={{width: formData.domain === "direct" ? "400px" : "150px"}}
                        />
                        {formData.domain !== "direct" && <span>@</span>}

                        <select className="Signup-input"
                                value={formData.domain}
                                onChange={handleDomainChange}
                                style={{width: "205px", marginLeft: "10px"}}>
                            <option value="">도메인 선택</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="naver.com">naver.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="direct">직접 입력</option>
                        </select>
                    </div>

                    <h2>이름</h2>
                    <input type="name" className="Signup-input" value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           placeholder="6자 이상 입력해주세요."/>
                    <h2>비밀번호</h2>
                    <input type="password" className="Signup-input" value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    <h2>비밀번호 확인</h2>
                    <input type="password" className="Signup-input" value={formData.confirmPassword}
                           onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}/>
                    {passwordMatchError && <p className="password-error">비밀번호가 일치하지 않습니다.</p>} {/* 오류 메시지 */}
                    <h2>주소</h2>
                    <div className="signup-address-box">
                        <input
                            type="text"
                            className="Signup-input"
                            value={formData.address} // 선택된 주소 표시
                            readOnly
                            placeholder="주소를 입력하세요"
                        />
                        <button
                            type="button"
                            className="signup-address-btn"
                            onClick={handleAddressSearch} // 주소찾기 버튼 클릭 시 카카오맵 열기
                        >
                            주소 찾기
                        </button>
                    </div>
                    <input type="detailAddress" className="Signup-input" value={formData.detailAddress}
                           onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                           style={{marginTop: "18px"}} placeholder="상세 주소를 입력하세요"/>
                    <h2>휴대폰 번호</h2>
                    <div className="phone-number-input">
                        <input type="tel" className="phone-input" value={formData.part1}
                               onChange={handleChange(1, (value) => setFormData({...formData, part1: value}))}
                               maxLength={3} placeholder="000"/>
                        -
                        <input type="tel" className="phone-input" value={formData.part2}
                               onChange={handleChange(2, (value) => setFormData({...formData, part2: value}))}
                               maxLength={4} placeholder="0000" style={{marginLeft: "10px"}}/>
                        -
                        <input type="tel" className="phone-input" value={formData.part3}
                               onChange={handleChange(3, (value) => setFormData({...formData, part3: value}))}
                               maxLength={4} placeholder="0000" style={{marginLeft: "10px"}}/>
                    </div>
                    <div className="consent-container">
                        <div className="consent-item">
                            <input type="checkbox" id="check1" className="checkbox" checked={formData.agreeTerms}
                                   onChange={handleConsentChange("agreeTerms")}/>
                            <label htmlFor="check1">(필수) 이용약관과 개인정보 수집 및 이용에 동의합니다.</label>
                        </div>
                        <div className="consent-item">
                            <input type="checkbox" id="check2" className="checkbox" checked={formData.agreeAge}
                                   onChange={handleConsentChange("agreeAge")}/>
                            <label htmlFor="check2">(필수) 만 14세 이상입니다.</label>
                        </div>
                        <h4>만 19세 미만의 미성년자가 결제 시 법정대리인이 거래를 취소할 수 있습니다.</h4>
                        <div className="consent-item">
                            <input type="checkbox" id="check3" className="checkbox" checked={formData.agreeMarketing}
                                   onChange={handleConsentChange("agreeMarketing")}/>
                            <label htmlFor="check3">(선택) 이메일 및 SMS 마케팅 정보 수신에 동의합니다.</label>
                        </div>
                        <h4>회원은 언제든지 회원 정보에서 수신 거부로 변경할 수 있습니다.</h4>
                        <div className="consent-item">
                            <input type="checkbox" id="check4" className="checkbox" checked={formData.agreeAll}
                                   onChange={handleConsentChange("agreeAll")}/>
                            <label htmlFor="check4">모두 동의합니다.</label>
                        </div>
                    </div>
                    <button className="Signup-btn">가입하기</button>
                </form>
                {response && <div>회원가입 성공: {JSON.stringify(response)}</div>}
            </div>
        </div>
    )
}

export default Signup;