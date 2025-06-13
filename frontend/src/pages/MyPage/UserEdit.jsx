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
    });

    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailOption, setEmailOption] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post("/api/updateMemberInfo", null, {
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
                    domain: emailParts[1],
                    customDomain: "",
                    zipCode: data.address?.zipCode || "",
                    address: data.address?.firstAddress || "",
                    detailAddress: data.address?.secondAddress || "",
                });

                setEmailOption(emailParts[1] || "");
            } catch (error) {
                console.error("사용자 정보를 불러오지 못했습니다:", error);
            }
        };

        fetchUserData();

        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

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
            password: formData.password,
            phoneNumber,
            email: fullEmail,
            address: {
                zipCode: formData.zipCode,
                firstAddress: formData.address,
                secondAddress: formData.detailAddress,
            },
        };

        try {
            const response = await axios.post("http://localhost:8080/api/updateMember", userData, {
                withCredentials: true,
            });
            console.log("서버 응답 데이터:", response.data);
            alert("회원 정보가 성공적으로 수정되었습니다.");
            navigate("/");
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
        <div className="user-edit-container">
            <div className="user-edit-title">회원정보 수정</div>

            <div className="user-edit-box">
                <div className="user-edit-greeting">
                    <div className="greeting-image" />
                    <div className="greeting-text">
                        <p><strong>안녕하세요. {formData.name} 님!</strong></p>
                        <p>회원가입해주셔서 감사합니다.</p>
                        <p><span className="highlight">5,000원</span>의 가입 축하 <span className="highlight">YELLOW 적립금</span>을 드렸습니다.</p>
                    </div>
                </div>
            </div>

            <div className="user-edit-line" />

            <form className="user-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>아이디 *</label>
                    <input type="text" value={formData.userId} disabled />
                </div>

                <div className="form-group">
                    <label>이메일 *</label>
                    <input type="text" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} />
                    <div className="radio-group">
                        <label><input type="radio" name="emailAgree" defaultChecked /> 수신함</label>
                        <label><input type="radio" name="emailAgree" /> 수신안함</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>이름 *</label>
                    <input type="text" value={formData.name} disabled />
                </div>

                <div className="form-group">
                    <label>배송지 정보 *</label>
                    <div className="address-row">
                        <input type="text" placeholder="우편번호" value={formData.zipCode} readOnly />
                        <button type="button" className="btn-lookup" onClick={handleAddressSearch}>주소찾기</button>
                    </div>
                    <input type="text" placeholder="기본 주소" value={formData.address} readOnly />
                    <input
                        type="text"
                        placeholder="상세 주소"
                        value={formData.detailAddress}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, detailAddress: e.target.value }))
                        }
                    />
                </div>

                <div className="form-group">
                    <label>휴대전화 *</label>
                    <div className="phone-row">
                        <input
                            type="text"
                            value={formData.part1}
                            onChange={(e) => handlePhoneChange("part1", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="text"
                            value={formData.part2}
                            onChange={(e) => handlePhoneChange("part2", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="text"
                            value={formData.part3}
                            onChange={(e) => handlePhoneChange("part3", e.target.value)}
                        />
                    </div>
                    <div className="radio-group">
                        <label><input type="radio" name="smsAgree" defaultChecked /> 수신함</label>
                        <label><input type="radio" name="smsAgree" /> 수신안함</label>
                    </div>
                </div>

                <div className="button-group">
                    <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>취소</button>
                    <button type="submit" className="btn-submit">수정</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
