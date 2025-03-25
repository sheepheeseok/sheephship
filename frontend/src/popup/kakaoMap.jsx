import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = ({ onClose, onAddressSelect }) => {
    const mapContainerRef = useRef(null); // 지도 컨테이너에 대한 참조
    const mapRef = useRef(null); // 지도 객체를 저장할 ref
    const [address, setAddress] = useState(''); // 주소 상태
    const myappkey = "b5fa763d68d611e9bfdf2b5267b79b62"; // 실제 앱 키 사용

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${myappkey}&autoload=false&libraries=services`; // services 라이브러리 추가
        script.async = true;

        script.onload = () => {
            // 카카오 지도 API가 정상적으로 로드되었는지 확인
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    if (mapContainerRef.current) {
                        const mapOptions = {
                            center: new window.kakao.maps.LatLng(37.49691410868307, 127.02807899720815), // 초기 위치
                            level: 3, // 확대 레벨
                        };

                        // 지도 객체를 mapRef에 저장
                        mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, mapOptions);

                        // 지도 클릭 이벤트 처리
                        window.kakao.maps.event.addListener(mapRef.current, 'click', (mouseEvent) => {
                            // 클릭한 위치의 좌표 얻기
                            const latLng = mouseEvent.latLng;
                            const lng = latLng.getLng();
                            const lat = latLng.getLat();

                            // 좌표 값 출력
                            console.log("클릭한 좌표 (Longitude, Latitude):", lng, lat);

                            // Geocoder 서비스가 정상적으로 로드된 후 사용
                            try {
                                const geocoder = new window.kakao.maps.services.Geocoder(); // Geocoder 객체 생성
                                // Longitude, Latitude 순서로 전달
                                geocoder.coord2Address(lng, lat, (result, status) => {
                                    // 상태와 결과를 로그로 출력
                                    console.log("Geocoder 호출 상태:", status);
                                    if (status === window.kakao.maps.services.Status.OK) {
                                        // 첫 번째 결과에서 주소 추출
                                        const fullAddress = result[0].address.address_name;

                                        // "구"와 "동"만 추출하기
                                        const addressParts = fullAddress.split(' ');
                                        // '구'와 '동'을 포함한 부분만 추출
                                        const districtAddress = addressParts.slice(1, 3).join(' '); // 구와 동만 추출

                                        setAddress(districtAddress); // 상태 업데이트

                                        // 주소 선택시 부모 컴포넌트로 주소 전달
                                        onAddressSelect(districtAddress);
                                    } else {
                                        console.error("주소를 찾을 수 없습니다. 상태:", status);
                                        setAddress('주소를 찾을 수 없습니다.');
                                    }
                                });
                            } catch (error) {
                                console.error("Geocoder 객체 생성 오류", error);
                                setAddress('Geocoder 객체 생성에 실패했습니다.');
                            }
                        });
                    }
                });
            } else {
                console.error('카카오 지도 API가 정상적으로 로드되지 않았습니다.');
                setAddress('카카오 지도 API 로딩 실패');
            }
        };

        script.onerror = (error) => {
            console.error('카카오 지도 API 로딩 실패:', error);
            setAddress('카카오 지도 API 로딩 실패');
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [onAddressSelect]);

    return (
        <div className="kakao-map-overlay">
            <div className="kakao-map-container">
                <div
                    ref={mapContainerRef} // 지도 컨테이너에 ref 연결
                    className="kakao-map"
                ></div>
                {address && <div className="kakao-map-address">{address}</div>} {/* 선택한 주소 출력 */}
                <button onClick={onClose} className="kakao-map-close-button">닫기</button> {/* 지도 닫기 버튼 */}
            </div>
        </div>
    );
};

export default KakaoMap;