import React, { useState } from 'react';

const UserOut = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    // TODO: 실제 회원탈퇴 API 연동
    setSuccess('회원탈퇴가 완료되었습니다.');
    setCurrentPassword('');
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="userout-outer">
      <div className="userout-title-row">
        <div className="userout-title">회원탈퇴</div>
      </div>
      <div className="userout-title-underline" />
      <div className="userout-inner">
        <div className="userout-desc">
          회원탈퇴하신 후 모든 개인정보는 삭제됩니다. 단, 개인정보 도용 등으로 인한 원치 않는 회원 탈퇴 등에 대비하기 위해 회원 탈퇴 일시 후 7일간 개인정보를 보유합니다.
        </div>
        <form onSubmit={handleSubmit} className="userout-form" id="userout-form">
          <div className="userout-input-group">
            <label className="userout-label">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="userout-input"
            />
          </div>
          {error && <p className="userout-error">{error}</p>}
          {success && <p className="userout-success">{success}</p>}
        </form>
      </div>
      <div className="userout-bottom-line" />
      <div className="userout-btn-row">
        <button type="button" className="userout-btn-cancel" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="userout-btn-submit" form="userout-form">
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default UserOut;