import { useState } from "react";

const Signup = () => {
    const [part1, setPart1] = useState("");
    const [part2, setPart2] = useState("");
    const [part3, setPart3] = useState("");

    // 각 입력 필드에서 변화가 있을 때 상태 업데이트
    const handleChange = (part, setter) => (e) => {
        const value = e.target.value.replace(/\D/g, ""); // 숫자만 남기기
        setter(value.substring(0, part === 1 ? 3 : 4)); // 각 부분에 맞게 자르기
    };

    return (
        <div className="container">
            <div className="Signup-container">
                <h1>회원가입</h1>
                <h2>아이디</h2>
                <input type="ID" className="Signup-input" placeholder="영문, 숫자 5자 이상 입력해주세요."/>
                <h2>이메일</h2>
                <input type="Email" className="Signup-input"/>
                <h2>이름</h2>
                <input type="name" className="Signup-input" placeholder="6자 이상 입력해주세요."/>
                <h2>비밀번호</h2>
                <input type="password" className="Signup-input"/>
                <h2>비밀번호 확인</h2>
                <input type="password" className="Signup-input"/>
                <h2>휴대폰 번호</h2>
                <div className="phone-number-input">
                    <input type="tel" className="phone-input" value={part1} onChange={handleChange(1, setPart1)}
                           maxLength={3} placeholder="000"/>
                    -
                    <input type="tel" className="phone-input" value={part2} onChange={handleChange(2, setPart2)}
                           maxLength={4} placeholder="0000" style={{marginLeft: "10px"}}/>
                    -
                    <input type="tel" className="phone-input" value={part3} onChange={handleChange(3, setPart3)}
                           maxLength={4} placeholder="0000" style={{marginLeft: "10px"}}/>
                </div>
                <div className="consent-container">
                    <div className="consent-item">
                        <input type="checkbox" id="check1" className="checkbox"/>
                        <label htmlFor="check1">(필수) 이용약관과 개인정보 수집 및 이용에 동의합니다.</label>
                    </div>
                    <div className="consent-item">
                        <input type="checkbox" id="check2" className="checkbox"/>
                        <label htmlFor="check2">(필수) 만 14세 이상입니다.</label>
                    </div>
                    <h4>만 19세 미만의 미성년자가 결제 시 법정대리인이 거래를 취소할 수 있습니다.</h4>
                    <div className="consent-item">
                        <input type="checkbox" id="check3" className="checkbox"/>
                        <label htmlFor="check3">(선택) 이메일 및 SMS 마케팅 정보 수신에 동의합니다.</label>
                    </div>
                    <h4>회원은 언제든지 회원 정보에서 수신 거부로 변경할 수 있습니다.</h4>
                    <div className="consent-item">
                        <input type="checkbox" id="check4" className="checkbox"/>
                        <label htmlFor="check4">모두 동의합니다.</label>
                    </div>
                </div>
                <button className="Signup-btn">가입하기</button>
            </div>
        </div>
    )
}

export default Signup;