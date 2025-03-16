import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="login-container">
                <img src="/imgs/login_logo.png" alt="login-logo" className="login-logo"/>

                <div className="login-area">
                    <h1>Email</h1>
                    <div className="login-box">
                        <img src="/icons/email.svg" alt="email-icon" className="login-icon"/>
                        <div className="login-line"/>
                        <input type="Email" className="login-input" placeholder="이메일 입력"/>
                    </div>

                    <h1>Password</h1>
                    <div className="login-box">
                        <img src="/icons/password.svg" alt="password-icon" className="login-icon"/>
                        <div className="login-line"/>
                        <input type="password" className="login-input" placeholder="비밀번호 입력"/>
                    </div>

                    <h2>비밀번호를 잊으셨나요?</h2>

                    <button className="login-btn">SIGN IN</button>

                    <h3>처음 방문 하시나요? <a onClick={() => navigate("/Signup")} style={{ cursor: "pointer" }}>회원가입 하러가기</a></h3>

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
