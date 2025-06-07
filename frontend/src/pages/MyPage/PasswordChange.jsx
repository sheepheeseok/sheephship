import React, { useState } from 'react';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
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

    if (newPassword.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    // TODO: API 연동
    setSuccess('비밀번호가 성공적으로 변경되었습니다.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="pwchange-container">
      <h2 className="pwchange-title">비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="pwchange-form">
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

        <button type="submit" className="pwchange-button">
          변경하기
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;

