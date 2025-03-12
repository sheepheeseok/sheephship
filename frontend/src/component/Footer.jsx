const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-link">
                <a>이용약관</a>
                <a>개인정보처리방침</a>
                <a>사업자정보확인</a>
            </div>

            <div className="footer-info">
                <h1>상호: 쉽슆웍스 (SHEEPSHIPWORKS) | 대표: 양희석 | 개인정보관리책임자: 홍준화 | 전화 070-1234-5678 | 이메일: info@sheep.com</h1>
                <h1>주소: 성남시 분당구 신구로18길 57, 타운빌딩 6층 | 사업자등록번호: 847-63-00063 | 통신판매: 2020-908432-0860 | 호스팅제공자: (주)클밍샵</h1>
            </div>

            <div className="footer-partner">
                <img src="/icons/toss.svg" alt="toss" className="toss"/>
                <h1>안전구매(에스크로) 서비스 가맹점</h1>
            </div>
        </div>
    )
}

export default Footer;