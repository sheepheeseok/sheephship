import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserEdit = () => {
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        part1: "",
        part2: "",
        part3: "",
        email: "",
        domain: "",
        customDomain: "",
        zipCode: "",
        address: "",
        detailAddress: "",
        emailAgree: true, // 추가: 이메일 수신 동의
        smsAgree: true,   // 추가: SMS 수신 동의
    });

    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailOption, setEmailOption] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post("http://localhost:8080/api/updateMemberInfo", null, { // 예시: 실제 API 엔드포인트로 변경
                    withCredentials: true,
                });

                const data = response.data;
                const phoneParts = data.phoneNumber ? data.phoneNumber.split("-") : ["", "", ""];
                const emailParts = data.email ? data.email.split("@") : ["", ""];

                setFormData({
                    userId: data.id || "",
                    password: "",
                    confirmPassword: "",
                    name: data.name || "",
                    part1: phoneParts[0],
                    part2: phoneParts[1],
                    part3: phoneParts[2],
                    email: emailParts[0],
                    domain: emailParts[1], // 이메일 도메인 설정
                    customDomain: "",
                    zipCode: data.address?.zipCode || "",
                    address: data.address?.firstAddress || "",
                    detailAddress: data.address?.secondAddress || "",
                    emailAgree: data.emailAgree || true, // API 응답에 따라 설정
                    smsAgree: data.smsAgree || true,     // API 응답에 따라 설정
                });

                setEmailOption(emailParts[1] || "");
            } catch (error) {
                console.error("사용자 정보를 불러오지 못했습니다:", error);
                // 실제 서비스에서는 에러 처리 (예: 사용자에게 메시지 표시)
            }
        };

        fetchUserData();

        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // ✅ 공통 input 변경 핸들러
    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // ✅ 주소 찾기 함수
    const handleAddressSearch = () => {
        if (!window.daum || !window.daum.Postcode) {
            alert("주소 검색 기능을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        new window.daum.Postcode({
            oncomplete: (data) => {
                let fullAddress = data.address;
                let extraAddress = "";

                if (data.addressType === "R") {
                    if (data.bname !== "") extraAddress += data.bname;
                    if (data.buildingName !== "") {
                        extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
                    }
                    if (extraAddress !== "") {
                        fullAddress += ` (${extraAddress})`;
                    }
                }

                setFormData((prev) => ({
                    ...prev,
                    zipCode: data.zonecode,
                    address: fullAddress,
                }));
            },
        }).open();
    };

    // ✅ 전화번호 입력 핸들러
    const handlePhoneChange = (field, value) => {
        const numericValue = value.replace(/\D/g, "");
        const limitedValue = numericValue.slice(0, field === "part1" ? 3 : 4);
        console.log(`handlePhoneChange: ${field} = ${limitedValue}`);
        setFormData((prev) => ({
            ...prev,
            [field]: limitedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        setPasswordMatchError(false);

        let fullEmail = formData.email;
        if (formData.domain === "direct" && formData.customDomain) {
            fullEmail = `${formData.email}@${formData.customDomain}`;
        } else if (formData.domain && formData.domain !== "direct") {
            fullEmail = `${formData.email}@${formData.domain}`;
        }

        const phoneNumber = `${formData.part1}-${formData.part2}-${formData.part3}`;
        console.log("전송하는 전화번호:", phoneNumber);

        const userData = {
            id: formData.userId,
            name: formData.name,
            ...(formData.password && { password: formData.password }),
            password: formData.password, // 비밀번호 필드 추가
            phoneNumber,
            email: fullEmail,
            address: {
                zipCode: formData.zipCode,
                firstAddress: formData.address,
                secondAddress: formData.detailAddress,
            },
            // 동의 여부 필드 추가 (API에 맞게 조정)
            emailAgree: formData.emailAgree,
            smsAgree: formData.smsAgree,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/updateMember", userData, { // 예시: 실제 API 엔드포인트로 변경
                withCredentials: true,
            });
            console.log("서버 응답 데이터:", response.data);
            alert("회원 정보가 성공적으로 수정되었습니다.");
            navigate("/"); // 수정 후 홈으로 이동
        } catch (error) {
            console.error("회원 정보 수정 실패:", error);
            if (error.response) {
                console.error("서버 응답 오류:", error.response.data);
            } else {
                console.error("네트워크 오류:", error.message);
            }
            alert("회원 정보 수정에 실패했습니다.");
        }
    };

    return (
        <>
            <div className="useredit-title">회원정보 수정</div>
            <div className="useredit-title-bar" />

        <div className="useredit-container">
            <div className="useredit-greeting-box">
                <div className="useredit-greeting-image" />
                <div className="useredit-greeting-text">
                    <p><strong>안녕하세요. {formData.name} 님!</strong></p>
                    <p>회원님의 회원등급은 <span className="useredit-highlight">RED</span> 입니다.</p>
                    <p><span className="useredit-highlight">50,000원</span> 이상 구매시 <span className="useredit-highlight useredit-yellow">YELLOW</span> 등급으로 올라갑니다.</p>
                </div>
            </div>

            <h2 className="useredit-section-title">기본정보</h2>
            <div className="useredit-section-bar" /> {/* "기본정보" 아래의 선 */}

            <form className="useredit-form" onSubmit={handleSubmit}>
                <div className="useredit-form-group">
                    <label>아이디 *</label>
                    <input type="text" className="useredit-input" value={formData.userId} disabled />
                </div>

                <div className="useredit-form-group">
                    <label>이메일 *</label>
                    <input
                        type="text"
                        className="useredit-input"
                        value={formData.email}
                        onChange={handleChange("email")}
                    />
                    <div className="useredit-radio-group">
                        <label>
                            <input
                                type="radio"
                                name="emailAgree"
                                checked={formData.emailAgree}
                                onChange={() => setFormData((prev) => ({ ...prev, emailAgree: true }))}
                            />
                            수신함
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="emailAgree"
                                checked={!formData.emailAgree}
                                onChange={() => setFormData((prev) => ({ ...prev, emailAgree: false }))}
                            />
                            수신안함
                        </label>
                    </div>
                </div>

                <div className="useredit-form-group">
                    <label>이름 *</label>
                    <input type="text" className="useredit-input" value={formData.name} disabled />
                </div>

                <div className="useredit-form-group">
                    <label>배송지 정보 *</label>
                    <div className="useredit-address-row">
                        <input type="text" className="useredit-input" placeholder="우편번호" value={formData.zipCode} readOnly />
                        <button type="button" className="useredit-btn-lookup" onClick={handleAddressSearch}>주소찾기</button>
                    </div>
                    <input type="text" className="useredit-input" placeholder="기본 주소" value={formData.address} readOnly />
                    <input
                        type="text"
                        className="useredit-input"
                        placeholder="상세 주소"
                        value={formData.detailAddress}
                        onChange={handleChange("detailAddress")}
                    />
                </div>

                <div className="useredit-form-group">
                    <label>휴대전화 *</label>
                    <div className="useredit-phone-row">
                        <input
                            type="text"
                            className="useredit-input"
                            value={formData.part1}
                            maxLength="3"
                            onChange={(e) => handlePhoneChange("part1", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="text"
                            className="useredit-input"
                            value={formData.part2}
                            maxLength="4"
                            onChange={(e) => handlePhoneChange("part2", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="text"
                            className="useredit-input"
                            value={formData.part3}
                            maxLength="4"
                            onChange={(e) => handlePhoneChange("part3", e.target.value)}
                        />
                    </div>
                    <div className="useredit-radio-group">
                        <label>
                            <input
                                type="radio"
                                name="smsAgree"
                                checked={formData.smsAgree}
                                onChange={() => setFormData((prev) => ({ ...prev, smsAgree: true }))}
                            />
                            수신함
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="smsAgree"
                                checked={!formData.smsAgree}
                                onChange={() => setFormData((prev) => ({ ...prev, smsAgree: false }))}
                            />
                            수신안함
                        </label>
                    </div>
                </div>

                <div className="useredit-button-group">
                    <button type="button" className="useredit-btn-cancel" onClick={() => navigate(-1)}>취소</button>
                    <button type="submit" className="useredit-btn-submit">수정</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default UserEdit;
