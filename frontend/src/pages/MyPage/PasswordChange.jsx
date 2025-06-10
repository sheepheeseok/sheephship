import React, { useState, useEffect } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const PasswordChange = () => {
  const [userId, setUserId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loginId = getCookie("loginId");
    if (loginId) setUserId(loginId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 7) {
      setError('비밀번호는 7자 이상이어야 합니다.');
      return;
    }

    try {
      // 1. 현재 비밀번호가 맞는지 검증이 필요하다면, 별도 API로 확인해야 합니다.
      // 여기서는 단순히 새 비밀번호만 전송한다고 가정합니다.
      const response = await fetch("/api/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // 쿠키 포함
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        const message = await response.text();
        setSuccess(message === "success" ? "비밀번호가 성공적으로 변경되었습니다." : message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="pwchange-outer">
        <div className="pwchange-title-row">
            <div className="pwchange-title">비밀번호 변경</div>
        </div>
      <div className="pwchange-inner">
        <div className="pwchange-desc">
          회원님의 개인정보를 안전하게 보호하고,<br/>
          개인정보 도용으로 인한 피해를 예방하기 위해 180일 이상 비밀번호를<br/>
          변경하지 않은 경우 비밀번호 변경을 권장하고 있습니다.
        </div>
        <form onSubmit={handleSubmit} className="pwchange-form">
          <div className="pwchange-input-group">
            <label className="pwchange-label">아이디</label>
            <input
              type="text"
              value={userId}
              readOnly
              className="pwchange-input"
              style={{ background: "#f5f5f5" }}
            />
          </div>
          <div className="pwchange-input-group">
            <label className="pwchange-label">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pwchange-input"
            />
          </div>
          <div className="pwchange-input-group">
            <label className="pwchange-label">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pwchange-input"
              placeholder="영문+숫자, 7~16자"
            />
          </div>
          <div className="pwchange-input-group">
            <label className="pwchange-label">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pwchange-input"
            />
          </div>
          {error && <p className="pwchange-error">{error}</p>}
          {success && <p className="pwchange-success">{success}</p>}
          <div className="pwchange-line"></div>
          <div className="pwchange-btn-row">
            <button type="button" className="pwchange-btn-cancel" onClick={handleCancel}>
              다음에 변경하기
            </button>
            <button type="submit" className="pwchange-btn-submit">
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;