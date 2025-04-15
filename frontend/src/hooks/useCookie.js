import { useState, useEffect } from 'react';

function useCookie(cookieName) {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        // 쿠키 값을 가져오는 함수
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null; // 쿠키가 없으면 null 반환
        };

        // 쿠키에서 값 읽기
        const cookie = getCookie(cookieName);
        setCookieValue(cookie); // 상태로 업데이트
    }, [cookieName]); // cookieName이 변경될 때마다 다시 실행됨

    return cookieValue;
}

export default useCookie;
