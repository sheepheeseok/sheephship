import { useState } from "react";

const SignupHook = () => {
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

    const handleChange = (part, setter) => (e) => {
        const value = e.target.value.replace(/\D/g, ""); // 숫자만 남기기
        setter(value.substring(0, part === 1 ? 3 : 4)); // 각 부분에 맞게 자르기
    };

    const handleEmailChange = (e) => {
        let emailValue = e.target.value;
        // '@'이 없으면 자동으로 '@'을 추가
        if (!emailValue.includes('@') && emailValue !== '') {
            emailValue += '@';
        }
        setFormData({
            ...formData,
            email: emailValue
        });
    };

    const handleDomainChange = (e) => {
        setFormData({
            ...formData,
            domain: e.target.value
        });
    };

    const handleCustomDomainChange = (e) => {
        setFormData({
            ...formData,
            customDomain: e.target.value
        });
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
        const { part1, part2, part3, email, domain , ...rest } = formData;
        const phoneNumber = `${part1}-${part2}-${part3}`;
        const userData = { ...rest, phoneNumber, email: fullEmail };

        let fullEmail = email;

        if (domain === "direct" && customDomain) {
            fullEmail = `${email}@${customDomain}`; // 커스텀 도메인 처리
        } else if (domain) {
            fullEmail = `${email}@${domain}`; // 일반 도메인 처리
        }


        console.log("전송할 사용자 데이터:", userData);

        try {
            const response = await axios.post("http://localhost:8080/api/signup", userData);
            setResponse(response.data);  // 응답 데이터를 상태에 저장
        } catch (error) {
            console.error("회원가입 실패:", error);
            setResponse(null);  // 오류 발생 시 응답 상태 초기화
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleEmailChange,
        handleDomainChange,
        handleCustomDomainChange,
        handleConsentChange,
        handleSubmit
    };
};

export default SignupHook;
