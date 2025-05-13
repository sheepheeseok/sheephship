import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const SignupHook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        part1: "",
        part2: "",
        part3: "",
        userId: "",
        email: "",
        domain: "",
        customDomain: "",
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        detailAddress: "",
        agreeTerms: false,             // (필수) 이용약관 동의
        agreeAge: false,               // (필수) 만 14세 이상 동의
        agreeMarketing: false,         // (선택) 마케팅 정보 동의
        agreeAll: false,               // 모두 동의
    });

    const [passwordMatchError, setPasswordMatchError] = useState(false);

    useEffect(() => {
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }

        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.head.appendChild(script);
    }, [formData.password, formData.confirmPassword]);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                const fullAddress = data.address;
                setFormData({
                    ...formData,
                    address: fullAddress,
                    detailAddress: "", // 상세 주소는 빈 문자열로 초기화
                });
            },
        }).open();
    };

    const handleChange = (part, setter) => (e) => {
        const value = e.target.value.replace(/\D/g, ""); // 숫자만 남기기
        setter(value.substring(0, part === 1 ? 3 : 4)); // 각 부분에 맞게 자르기
    };

    // 도메인 선택 핸들러
    const handleDomainChange = (e) => {
        const selectedDomain = e.target.value;
        setFormData({ ...formData, domain: selectedDomain, customDomain: "" });
    };

    const handleConsentChange = (name) => (e) => {
        const value = e.target.checked;

        // "모두 동의"가 체크될 때 다른 모든 동의 항목 업데이트
        if (name === "agreeAll") {
            setFormData({
                ...formData,
                agreeAll: value,
                agreeTerms: value,
                agreeAge: value,
                agreeMarketing: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e, axios, setResponse) => {
        e.preventDefault();

        if (!formData.userId || !formData.email || !formData.name || !formData.password || !formData.confirmPassword || !formData.address || !formData.detailAddress || !formData.part1 || !formData.part2 || !formData.part3 || !formData.agreeTerms || !formData.agreeAge) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        // 비밀번호가 일치하지 않으면 submit을 막고 처리
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
            alert("비밀번호를 다시 입력하세요")
            return;
        }
        setPasswordMatchError(false); // 비밀번호가 일치하면 오류 메시지 숨김

        const { email, domain, customDomain, address, detailAddress } = formData;

        // 이메일 주소 조합
        let fullEmail = email;
        if (domain === "direct" && customDomain) {
            fullEmail = `${email}@${customDomain}`;
        } else if (domain && domain !== "direct") {
            fullEmail = `${email}@${domain}`;
        }

        const userData = {
            id: formData.userId, // userId → id로 변경
            name: formData.name,
            password: formData.password,
            phoneNumber: `${formData.part1}-${formData.part2}-${formData.part3}`,
            email: fullEmail,
            address: {
                firstAddress: address,      // formData에서 address를 첫 번째 주소로 사용
                secondAddress: detailAddress // formData에서 detailAddress를 두 번째 주소로 사용
            },
            agreeTerms: formData.agreeTerms,  // agreeTerms 값만 전송
            agreeAge: formData.agreeAge,      // agreeAge 값만 전송
            agreeMarketing: formData.agreeMarketing // agreeMarketing 값만 전송
        };

        console.log("전송할 사용자 데이터:", userData);

        try {
            const response = await axios.post("http://localhost:8080/api/signup", userData);
            alert(response.data);
            navigate("/");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다."); // 에러 발생 시 알림창 표시
            setResponse(null);
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleDomainChange,
        handleConsentChange,
        handleSubmit,
        handleAddressSearch,
        passwordMatchError,
    }
};

export default SignupHook;
