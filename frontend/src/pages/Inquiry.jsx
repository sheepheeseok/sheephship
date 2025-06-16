import React, { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import QuestionHook from "../hooks/QuestionHook.js";
import useCookie from "../hooks/useCookie.js";
import axios from "axios";

const Inquiry = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.state?.itemId;
  const memberId = useCookie("loginId");

  const { addQuestion } = QuestionHook();

  const handleSubmit = async () => {
    if (content.length < 10) {
      alert("문의 내용을 10자 이상 작성해 주세요.");
      return;
    }

    if (!itemId || !memberId) {
      alert("상품 정보 또는 로그인 정보가 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("itemId", itemId);
    formData.append("memberId", memberId);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("/api/questions/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("문의가 등록되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("문의 등록 실패:", err);
      alert("문의 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-form">
        <h2 className="inquiry-title">1:1 문의</h2>
        <div className="inquiry-label">내용</div>
        <textarea
          className="inquiry-textarea"
          placeholder="접수된 문의는 순차적으로 답변해 드리고 있습니다. 정확한 답변을 위해 문의 내용을 상세히 작성해 주세요. 필요 시 문의하신 내용에 대해 전화로 연락드릴 수 있습니다."
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={200}
        />
        <div className="inquiry-text-info">
          <span className="min-length">10자 이상</span>
          <span className="text-count">{content.length}/200</span>
        </div>
        <div className="inquiry-label">사진 등록</div>
        <div className="photo-upload-area">
          <label htmlFor="photo-upload" className="photo-upload-box">
            {image ? (
                <img src={URL.createObjectURL(image)} alt="업로드 이미지"/>
            ) : (
                <span className="plus-icon">+</span>
            )}
          </label>
          <input
              id="photo-upload"
              type="file"
              accept="image/*"
              style={{display: "none"}}
              onChange={e => setImage(e.target.files[0])}
          />
        </div>
        <div className="inquiry-buttons">
          <button className="cancel-btn" type="button" onClick={() => navigate(-1)}>취소</button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
      <div className="notice-section">
        <div className="notice-title">1:1 문의 유의사항</div>
        <ul className="notice-list">
          <li>제품 사용, 오염, 전용 박스 손상, 라벨 제거, 사은품 및 부속 사용/분실 시, 교환/환불이 불가능 합니다.</li>
          <li>교환을 원하시는 상품(사이즈)의 재고가 부족 시, 교환이 불가합니다.</li>
          <li>주문취소/교환/환불은 마이페이지&gt;주문내역에서 신청하실 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default Inquiry;