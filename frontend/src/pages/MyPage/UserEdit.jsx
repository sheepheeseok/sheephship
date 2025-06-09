import React, { useState, useEffect } from "react";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const UserEdit = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    domain: "",
    customDomain: "",
    name: "",
    password: "",
    confirmPassword: "",
    address: "",
    detailAddress: "",
    part1: "",
    part2: "",
    part3: "",
    agreeTerms: false,
    agreeAge: false,
    agreeMarketing: false,
    agreeAll: false,
    smsConsent: false,
    emailConsent: false,
  });
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const loginId = getCookie("loginId");
        if (!loginId) {
          alert("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        // 👇 변경된 요청 방식
        const res = await axios.post("/api/updateMemberInfo");
        const user = res.data;
        console.log(user);

        const emailParts = user.email?.split("@") || [];
        const phoneParts = user.phoneNumber?.split("-") || [];

       setFormData({
         userId: user.id || "",
         email: user.email ? user.email.split("@")[0] : "",
         domain: user.email ? user.email.split("@")[1] : "",
         customDomain: "",
         name: user.name || "",
         address: user.address?.address || "",
         detailAddress: user.address?.detailAddress || "",
         part1: user.phoneNumber ? user.phoneNumber.split("-")[0] : "",
         part2: user.phoneNumber ? user.phoneNumber.split("-")[1] : "",
         part3: user.phoneNumber ? user.phoneNumber.split("-")[2] : "",
         agreeTerms: user.agreeTerms || false,
         agreeAge: user.agreeAge || false,
         agreeMarketing: user.agreeMarketing || false,
         agreeAll: false,
         smsConsent: false,
         emailConsent: false,
       });
        setGrade(user.grade || "");
      } catch (e) {
        alert("회원 정보를 불러오지 못했습니다.");
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCheck = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginId = getCookie("loginId");
    if (!loginId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // TODO: 서버에 맞는 PUT API로 수정 필요
    const res = await axios.put(`/api/OrderMemberbyId/${loginId}`, formData);
    setResponse(res.data);
    alert("회원정보가 수정되었습니다.");
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="container">
      <div className="UserEdit-container">
        <h1>회원정보 수정</h1>
        <div className="useredit-greeting-box">
          <div className="useredit-greeting-img">
            <img src="/imgs/profile_greeting.png" alt="greeting" style={{height: 80}} />
          </div>
          <div className="useredit-greeting-text">
            <h2>안녕하세요, {formData.name} 님!</h2>
            <span>회원님의 등급은 <b style={{color: "#FF5F5F"}}>{grade}</b> 입니다.</span>
            <div style={{marginTop: 8, fontWeight: 500}}>5,000원 <span style={{color: "#FF5F5F"}}>{grade}</span> 등급 적립금이 있습니다.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="useredit-form">
          <h2>기본정보</h2>
          <label>아이디</label>
          <input type="text" value={formData.userId} readOnly className="UserEdit-input" />

          <label>이메일</label>
          <div style={{display: "flex", alignItems: "center"}}>
            <input
              type="text"
              value={formData.email}
              onChange={handleChange("email")}
              className="UserEdit-input"
              style={{width: 150}}
            />
            <span>@</span>
            <input
              type="text"
              value={formData.domain}
              onChange={handleChange("domain")}
              className="UserEdit-input"
              style={{width: 150, marginLeft: 8}}
            />
          </div>

          <label>이름</label>
          <input type="text" value={formData.name} onChange={handleChange("name")} className="UserEdit-input" />

          <label>주소</label>
          <div style={{display: "flex", alignItems: "center"}}>
            <input type="text" value={formData.address} readOnly className="UserEdit-input" style={{width: 300}} />
            <button type="button" className="useredit-address-btn" style={{marginLeft: 8}}>주소 찾기</button>
          </div>
          <input type="text" value={formData.detailAddress} onChange={handleChange("detailAddress")} className="UserEdit-input" placeholder="상세 주소 입력" style={{marginTop: 8}} />

          <label>휴대폰 번호</label>
          <div style={{display: "flex", alignItems: "center"}}>
            <input type="tel" value={formData.part1} onChange={handleChange("part1")} className="UserEdit-input" style={{width: 60}} maxLength={3} /> -
            <input type="tel" value={formData.part2} onChange={handleChange("part2")} className="UserEdit-input" style={{width: 80, marginLeft: 8}} maxLength={4} /> -
            <input type="tel" value={formData.part3} onChange={handleChange("part3")} className="UserEdit-input" style={{width: 80, marginLeft: 8}} maxLength={4} />
          </div>

          <div style={{marginTop: 16}}>
            <label>
              <input type="checkbox" checked={formData.smsConsent} onChange={handleCheck("smsConsent")} />
              SMS 수신동의
            </label>
            <label style={{marginLeft: 24}}>
              <input type="checkbox" checked={formData.emailConsent} onChange={handleCheck("emailConsent")} />
              이메일 수신동의
            </label>
          </div>

          <div style={{marginTop: 32, display: "flex", justifyContent: "center", gap: 16}}>
            <button type="button" className="UserEdit-cancel-btn" onClick={() => window.location.reload()}>취소</button>
            <button type="submit" className="UserEdit-submit-btn">수정</button>
          </div>
        </form>
        {response && <div>수정 완료: {JSON.stringify(response)}</div>}
      </div>
    </div>
  );
};

export default UserEdit;
