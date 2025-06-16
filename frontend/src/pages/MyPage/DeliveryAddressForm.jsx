import React, { useState, useEffect } from "react";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const DeliveryAddressForm = ({ onAddAddress, setSelectedTab, editingAddressId }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    part1: "",
    part2: "",
    part3: "",
    emailPrefix: "",
    emailDomain: "",
    emailDomainOption: "select",
    customEmailDomain: "",
    request: "배송 메시지 선택",
    isDefaultAddress: false,
  });

  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  // 주소 검색 스크립트 로드
  useEffect(() => {
    if (window.daum?.Postcode) {
      setLoading(false);
    } else {
      const script = document.createElement("script");
      script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => setLoading(false);
      script.onerror = () => alert("주소 검색 기능을 불러오지 못했습니다.");
      document.body.appendChild(script);
    }
  }, []);

  // 수정 모드: 배송지 정보 로드
  useEffect(() => {
    const fetchAddress = async () => {
      if (!editingAddressId) return;
      try {
        const loginId = getCookie("loginId");
        const res = await axios.get(`/api/MemberDeliveryInfo/${loginId}`);
        const addresses = Array.isArray(res.data) ? res.data : [res.data];
        const target = addresses.find(item => String(item.id) === String(editingAddressId));
        if (!target) return;

        const [part1, part2, part3] = (target.phoneNumber || "").split("-");
        const [emailPrefix, emailDomain] = (target.email || "").split("@");

        setFormData({
          recipientName: target.name || "",
          zipCode: target.zipCode || "",
          address: target.firstAddress || "",
          detailAddress: target.secondAddress || "",
          part1: part1 || "",
          part2: part2 || "",
          part3: part3 || "",
          emailPrefix: emailPrefix || "",
          emailDomain: emailDomain || "",
          emailDomainOption: ["naver.com", "gmail.com", "daum.net"].includes(emailDomain) ? "select" : "direct",
          customEmailDomain: ["naver.com", "gmail.com", "daum.net"].includes(emailDomain) ? "" : emailDomain,
          request: target.request || "배송 메시지 선택",
          isDefaultAddress: target.isDefaultAddress || false,
        });
      } catch (err) {
        console.error("배송지 정보 불러오기 실패:", err);
        alert("배송지 정보를 불러오지 못했습니다.");
      }
    };

    fetchAddress();
  }, [editingAddressId]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddressSearch = () => {
    if (loading) {
      alert("주소 검색 기능을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname) extraAddress += data.bname;
          if (data.buildingName) extraAddress += (extraAddress ? ", " : "") + data.buildingName;
          if (extraAddress) fullAddress += ` (${extraAddress})`;
        }

        setFormData((prev) => ({
          ...prev,
          zipCode: data.zonecode,
          address: fullAddress,
        }));
      },
    }).open();
  };

  const handleEmailDomainOptionChange = (option) => {
    setFormData({
      ...formData,
      emailDomainOption: option,
      emailDomain: "",
      customEmailDomain: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginId = getCookie("loginId");
    if (!loginId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const {
      recipientName,
      zipCode,
      address,
      detailAddress,
      part1,
      part2,
      part3,
    } = formData;

    if (
      !recipientName.trim() ||
      !zipCode.trim() ||
      !address.trim() ||
      !detailAddress.trim() ||
      !part1.trim() ||
      !part2.trim() ||
      !part3.trim()
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const fullEmail = formData.emailDomainOption === "direct"
      ? `${formData.emailPrefix}@${formData.customEmailDomain}`
      : `${formData.emailPrefix}@${formData.emailDomain}`;

    const payload = {
      name: formData.recipientName,
      zipCode: formData.zipCode,
      firstAddress: formData.address,
      secondAddress: formData.detailAddress,
      phoneNumber: `${formData.part1}-${formData.part2}-${formData.part3}`,
      email: fullEmail,
      request: formData.request,
      isDefaultAddress: formData.isDefaultAddress,
      memberId: loginId,
    };

    try {
      if (editingAddressId) {
        await axios.put(`/api/updateDeliveryAddress/${editingAddressId}`, payload);
        alert("배송 주소록이 수정되었습니다.");
      } else {
        await axios.post(`/api/addDeliveryAddress`, payload);
        alert("배송 주소록이 추가되었습니다.");
      }

      // 초기화
      setFormData({
        recipientName: "",
        zipCode: "",
        address: "",
        detailAddress: "",
        part1: "",
        part2: "",
        part3: "",
        emailPrefix: "",
        emailDomain: "",
        emailDomainOption: "select",
        customEmailDomain: "",
        request: "배송 메시지 선택",
        isDefaultAddress: false,
      });

      onAddAddress?.();
      setSelectedTab?.("list");
    } catch (e) {
      alert("배송 주소록 저장에 실패했습니다.");
      console.error(e);
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
        <div className="DAF-delivery-address-container">
          <h1>배송 주소록 관리</h1>
          <div className="DAF-delivery-address-title-bar" />

          <form onSubmit={handleSubmit}>
            {/* 받는 사람 */}
            <div className="DAF-form-row">
              <label className="DAF-form-label">받는사람 *</label>
              <input
                type="text"
                className="DAF-form-input-text DAF-large"
                value={formData.recipientName}
                onChange={handleChange("recipientName")}
              />
            </div>

            {/* 주소 */}
            <div className="DAF-form-row" style={{ alignItems: "flex-start" }}>
              <label className="DAF-form-label">주소 *</label>
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div className="DAF-form-row" style={{ gap: "10px", marginBottom: "8px" }}>
                  <input
                    type="text"
                    className="DAF-form-input-text"
                    placeholder="우편번호"
                    value={formData.zipCode}
                    readOnly
                  />
                  <button type="button" className="DAF-address-search-btn" onClick={handleAddressSearch}>주소검색</button>
                </div>
                <input
                  type="text"
                  className="DAF-form-input-text DAF-large"
                  placeholder="기본주소"
                  value={formData.address}
                  readOnly
                  style={{ marginBottom: "8px" }}
                />
                <input
                  type="text"
                  className="DAF-form-input-text DAF-large"
                  placeholder="상세주소"
                  value={formData.detailAddress}
                  onChange={handleChange("detailAddress")}
                />
              </div>
            </div>

            {/* 휴대전화 */}
            <div className="DAF-form-row">
              <label className="DAF-form-label">휴대전화 *</label>
              <input type="tel" className="DAF-tel-input-part" value={formData.part1} onChange={handleChange("part1")} maxLength={3} />
              <span className="DAF-tel-dash">-</span>
              <input type="tel" className="DAF-tel-input-part" value={formData.part2} onChange={handleChange("part2")} maxLength={4} />
              <span className="DAF-tel-dash">-</span>
              <input type="tel" className="DAF-tel-input-part" value={formData.part3} onChange={handleChange("part3")} maxLength={4} />
            </div>

            {/* 이메일 */}
            <div className="DAF-form-row">
              <label className="DAF-form-label">이메일</label>
              <input
                type="text"
                className="DAF-form-input-text DAF-medium"
                value={formData.emailPrefix}
                onChange={handleChange("emailPrefix")}
              />
              <span style={{ margin: "0 5px" }}>@</span>
              <select
                className="DAF-email-domain-select"
                value={formData.emailDomainOption === "select" ? formData.emailDomain : "direct"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "direct") {
                    handleEmailDomainOptionChange("direct");
                  } else {
                    setFormData({ ...formData, emailDomain: val, emailDomainOption: "select", customEmailDomain: "" });
                  }
                }}
              >
                <option value="">선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="direct">직접 입력</option>
              </select>
              {formData.emailDomainOption === "direct" && (
                <input
                  type="text"
                  className="DAF-email-domain-custom-input"
                  value={formData.customEmailDomain}
                  onChange={handleChange("customEmailDomain")}
                  placeholder="직접 입력"
                  style={{ marginLeft: "10px", width: "150px" }}
                />
              )}
            </div>

            {/* 요청사항 */}
            <div className="DAF-form-row">
              <label className="DAF-form-label">요청 사항</label>
              <select
                className="DAF-request-select"
                value={formData.request}
                onChange={handleChange("request")}
              >
                <option value="배송 메시지 선택">-- 메시지 선택 -- (선택사항)</option>
                <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                <option value="부재 시 전화 주세요">부재 시 전화 주세요</option>
              </select>
            </div>

            {/* 기본배송지 체크 */}
            <div className="DAF-checkbox-group" style={{ marginTop: '30px', marginBottom: '40px' }}>
              <label className="DAF-checkbox-label">
                <input
                  type="checkbox"
                  className="DAF-checkbox-input"
                  checked={formData.isDefaultAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, isDefaultAddress: e.target.checked }))}
                />
                기본 배송지로 저장
              </label>
            </div>

            <div className="DAF-bar" />
            <div className="DAF-action-buttons">
              <button type="button" className="DAF-cancel-button" onClick={() => window.history.back()}>취소</button>
              <button type="submit" className="DAF-register-button">등록</button>
            </div>
          </form>

          <div className="DAF-notice-section" style={{ marginTop: '60px' }}>
            <h2>배송 주소록 유의사항</h2>
            <div className="DAF-notice-bar" />
            <p className="DAF-notice-text">
              • 배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.<br />
              • 자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.<br />
              • 기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.
            </p>
          </div>

          {response && <div>등록 완료: {JSON.stringify(response)}</div>}
        </div>
      );
    };

    export default DeliveryAddressForm;

