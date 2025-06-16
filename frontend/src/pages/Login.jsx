import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginHook from "../hooks/LoginHook.js";

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = LoginHook(); // 로그인 훅 사용

    const handleLogin = async () => {
        const result = await login(id, password);
        if (result) {
            alert("로그인 성공!");
            navigate("/");
        } else {
            console.log("로그인 실패!");
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <img src="/imgs/login_logo.png" alt="login-logo" className="login-logo"/>

                <div className="login-area">
                    <h1>ID</h1>
                    <div className="login-box">
                        <img src="/icons/email.svg" alt="email-icon" className="login-icon"/>
                        <div className="login-line"/>
                        <input type="Email" className="login-input" value={id} onChange={(e) => setId(e.target.value)} placeholder="이메일 입력"/>
                    </div>

                    <h1>Password</h1>
                    <div className="login-box">
                        <img src="/icons/password.svg" alt="password-icon" className="login-icon"/>
                        <div className="login-line"/>
                        <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력"/>
                    </div>

                    <h2>비밀번호를 잊으셨나요?</h2>

                    <button className="login-btn" onClick={handleLogin} disabled={loading}>
                        {loading ? "로그인 중..." : "SIGN IN"}
                    </button>
                    {error && <p style={{ color: "red", marginTop: "2px", margin: 0 }}>{error}</p>}
                    <h3>처음 방문 하시나요? <a onClick={() => navigate("/Signup")} style={{cursor: "pointer"}}>회원가입 하러가기</a>
                    </h3>

                    <div className="login-divider">
                        <hr/>
                        <span>OR</span>
                        <hr/>
                    </div>

                    <div className="other-login">
                        <img src="/icons/google.svg" alt="google-login" className="other-icon"/>
                        <img src="/icons/kakao-talk.svg" alt="kakao-login" className="other-icon"/>
                        <img src="/icons/naver.svg" alt="naver-login" className="other-icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
