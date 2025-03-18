import React, { useState } from "react";

const Product = () => {
    {/* 제품 개수 카운팅 버튼 */}
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    {/* 제품 정보 더보기 */}
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    {/* 제품 메인 로고 변경 */}
    const [currentImage, setCurrentImage] = useState("/imgs/product1.png");
    const changeImage = (imageSrc) => {
        setCurrentImage(imageSrc);
    };


    return (
        <div className="container">
            <div className="Product-container">
                <img src={currentImage} alt="Product-img" className="Product-img"/>

                <div className="Product-box">
                    <h1>쉽쉽 메탈립 초크백 그레이 (grey)</h1>

                    <h2 style={{marginTop: "23px"}}>32,000원</h2>

                    <h2 style={{marginTop: "28px"}}>메탈립 원단으로 제작된 초크백입니다.</h2>

                    <h2 style={{marginTop: "36px"}}>허리벨트 및 버클 퀄리티 변경 (버클 YKK)</h2>
                    <h2 style={{marginTop: "12px"}}>안감 플리스 원단 컬러 변경 (라이트그레이)</h2>

                    <h2 style={{marginTop: "38px"}}>리드 등반 시 방해 받지 않도록 가볍고 심플하게 제작했습니다.</h2>

                    <div className="product-buyinfo" style={{marginTop: "27px"}}>
                        <h1>적립금</h1>
                        <h2>1%</h2>
                        <img src="/icons/info.svg" alt="info-icon" className="info-icon"/>
                    </div>
                    <div className="product-buyinfo" style={{marginTop: "15.5px"}}>
                        <h1>배송비</h1>
                        <div className="deliverly-info">
                            <h2>3,000원 (50,000원 이상 구매 시 무료)</h2>
                            <h2>제주 및 도서 산간 3,000원 추가</h2>
                        </div>
                    </div>

                    <h2 style={{fontSize: "13px", marginTop: "23.5px", marginBottom: "8.5px"}}>수량</h2>
                    <div className="buy-box">
                        <button onClick={decreaseQuantity} style={{borderRight: "1px solid #ccc"}}
                                className="buy-box-btn">-
                        </button>
                        <span className="buy-box-text">{quantity}</span>
                        <button onClick={increaseQuantity} style={{borderLeft: "1px solid #ccc"}}
                                className="buy-box-btn">+
                        </button>
                    </div>

                    <div className="buy-result-box">
                        <div className="buy-per-box">
                            <h1>주문 수량</h1>
                            <h2>1개</h2>
                        </div>
                        <div className="buy-per-box">
                            <h1>총 상품 금액</h1>
                            <h2>32,000원</h2>
                        </div>
                    </div>

                    <div className="product-btn-box">
                        <button className="buy-btn">구매하기</button>
                        <button className="product-cart-btn">장바구니</button>
                    </div>

                    <div className="product-toss-box">
                        <div className="product-toss-text">
                            <h1>쉽고 빠른</h1>
                            <h1>토스페이 간편결제</h1>
                        </div>
                        <button className="product-toss-btn">
                            <img src="/icons/toss-pay-logo.png.svg" alt="toss-pay-logo" className="toss-pay-logo"/>
                            구매하기
                        </button>
                    </div>
                </div>
            </div>
            <div className="product-img-info">
                <img src="/imgs/product1.png" alt="product1" className="info-product-img" onClick={() => changeImage("/imgs/product1.png")} onMouseEnter={() => handleImageHover("/imgs/product1.png")}/>
                <img src="/imgs/product2.png" alt="product2" className="info-product-img" onClick={() => changeImage("/imgs/product2.png")} onMouseEnter={() => handleImageHover("/imgs/product1.png")}/>
                <img src="/imgs/product3.png" alt="product3" className="info-product-img" onClick={() => changeImage("/imgs/product3.png")} onMouseEnter={() => handleImageHover("/imgs/product1.png")}/>
                <img src="/imgs/product4.png" alt="product4" className="info-product-img" onClick={() => changeImage("/imgs/product4.png")} onMouseEnter={() => handleImageHover("/imgs/product1.png")}/>
            </div>

            <div className="product-info-title">
                <a>상품 설명</a>
                <a>후기 (0)</a>
                <a>Q&N</a>
                <a>관련 상품</a>
            </div>

            <div className="product-info-box">
                <li>
                    소재:겉감 - 100% nylon
                    <span className="indent">안감 - 100% polyester (micro fleece)</span>
                </li>
                <li>크기 : 20 X 15 cm (가로X높이)</li>
                <li>안감색상 : light grey</li>
                <li>제조국 : 한국</li>
                <li>제조사 : 오름 (ORUMM)</li>

                <button onClick={toggleExpand} className="expand-btn">
                    {isExpanded ? '상품정보 접기' : '상품정보 더보기'}
                    <img
                        src="/icons/p-info-icon.svg"
                        alt="p-info-icon"
                        style={{
                            marginTop: "2px",
                            transition: 'transform 0.3s ease',  // 회전 효과 추가
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'  // isExpanded에 따라 회전
                        }}
                    />
                </button>

                <div className="image-container" style={{maxHeight: isExpanded ? 'none' : '400px'}}>
                    <img src="/imgs/product1.png" alt="p-detail-img" className="p-detail-img"
                         style={{marginTop: "96px"}}/>
                    <h1>DETAILS</h1>
                    <img src="/imgs/p-detail-img2.png" alt="p-detail-img" className="p-detail-img"/>
                    <img src="/imgs/p-detail-img3.png" alt="p-detail-img" className="p-detail-img"
                         style={{marginTop: "64px"}}/>
                    <img src="/imgs/p-detail-img4.png" alt="p-detail-img" className="p-detail-img"
                         style={{marginTop: "64px"}}/>
                    <h2 style={{marginTop: "100px"}}>*상품의 색상은 모니터 해상도에 따라 실제 색상과 다소 차이가 있을 수 있으며 구매 전 상세 사진을 꼼꼼히 확인
                        바랍니다.</h2>
                    <img src="/imgs/p-detail-img5.png" alt="p-detail-img" className="p-detail-img"
                         style={{marginTop: "5px"}}/>
                </div>

            </div>
        </div>
    )
}

export default Product;