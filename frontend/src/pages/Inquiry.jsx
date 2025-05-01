import React, { useState } from "react";

const Inquiry = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

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
              <img src={URL.createObjectURL(image)} alt="업로드 이미지" />
            ) : (
              <span className="plus-icon">+</span>
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => setImage(e.target.files[0])}
          />
        </div>
        <div className="inquiry-buttons">
          <button className="cancel-btn" type="button">취소</button>
          <button className="submit-btn" type="button">등록</button>
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