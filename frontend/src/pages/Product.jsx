import React, { useState, useEffect } from "react";
import useProduct from "../hooks/ProductHook";

const Product = () => {
    const { ProductData, loading, error, handleSubmit, handleAddToCart } = useProduct();

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    console.log("colors 배열 확인:", ProductData.colors);

    const [currentImage, setCurrentImage] = useState(null);
    useEffect(() => {
        if (ProductData.mainUrl) {
            setCurrentImage(ProductData.mainUrl);
        }
    }, [ProductData]);

    const changeImage = (imageSrc) => {
        setCurrentImage(imageSrc);
    };

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    // 🧠 사이즈/컬러 필터링
    const availableSizes = [...new Set(
        ProductData.colors
            ?.filter(opt => selectedColor ? opt.color === selectedColor : true)
            .map(opt => opt.size)
    )].filter(Boolean);

    const availableColors = [...new Set(
        ProductData.colors
            ?.filter(opt => selectedSize ? opt.size === selectedSize : true)
            .map(opt => opt.color)
    )].filter(Boolean);

// 💡 선택된 값이 유효하지 않으면 초기화
    useEffect(() => {
        if (selectedColor && !availableSizes.includes(selectedSize)) {
            setSelectedSize("");
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedSize && !availableColors.includes(selectedColor)) {
            setSelectedColor("");
        }
    }, [selectedSize]);

    const handleOptionAdd = () => {
        if (!selectedColor || !selectedSize) return;
        const exists = selectedOptions.find(
            (opt) => opt.color === selectedColor && opt.size === selectedSize
        );
        if (exists) return;

        const matched = ProductData.colors.find(
            (opt) => opt.color === selectedColor && opt.size === selectedSize
        );

        if (!matched || !matched.itemDetailId) {
            alert("선택한 옵션을 찾을 수 없습니다.");
            return;
        }

        setSelectedOptions([
            ...selectedOptions,
            {
                itemDetailId: matched.itemDetailId, // ✅ 필수
                color: selectedColor,
                size: selectedSize,
                quantity: 1,
            },
        ]);
    };

    const updateQuantity = (index, delta) => {
        setSelectedOptions((prev) =>
            prev.map((opt, i) =>
                i === index ? { ...opt, quantity: Math.max(1, opt.quantity + delta) } : opt
            )
        );
    };

    const removeOption = (index) => {
        setSelectedOptions((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <div className="Product-container">
                <img src={currentImage} alt="Product-img" className="Product-img"/>

                <div className="Product-box">
                    <h1>{ProductData.name}</h1>

                    <div className="Product-priceinfo">
                        <h2 style={{marginTop: "23px"}}>{ProductData.price?.toLocaleString()}원</h2>
                        <div className="tooltip-container">
                            <img src="/icons/info.svg" alt="info-icon" className="info-icon"
                                 style={{width: "20px", height: "20px", display: "flex"}}/>
                            <div className="tooltip-box">
                                <h1>등급별 할인</h1>
                                <ul>
                                    <li><img src="/imgs/grade/red_grade.png" alt="grade-icon"
                                             className="grade-icon"/> RED 3%
                                    </li>
                                    <div className="grade-line"/>
                                    <li><img src="/imgs/grade/yellow_grade.png" alt="grade-icon"
                                             className="grade-icon"/> YELLOW 5%
                                    </li>
                                    <div className="grade-line"/>
                                    <li><img src="/imgs/grade/navy_grade.png" alt="grade-icon"
                                             className="grade-icon"/> NAVY 7%
                                    </li>
                                    <div className="grade-line"/>
                                    <li><img src="/imgs/grade/purple_grade.png" alt="grade-icon"
                                             className="grade-icon"/> PURPLE 9%
                                    </li>
                                    <div className="grade-line"/>
                                    <li><img src="/imgs/grade/brown_grade.png" alt="grade-icon"
                                             className="grade-icon"/> BROWN 12%
                                    </li>
                                    <div className="grade-line"/>
                                    <li><img src="/imgs/grade/black_grade.png" alt="grade-icon"
                                             className="grade-icon"/> BLACK 15%
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

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
                            <h2>{ProductData.deliveryFee?.toLocaleString()}원 (50,000원 이상 구매 시 무료)</h2>
                            <h2>제주 및 도서 산간 3,000원 추가</h2>
                        </div>
                    </div>

                    <div className="select-container">
                        <label>사이즈: </label>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="">선택</option>
                            {availableSizes.map((size, idx) => (
                                <option key={idx} value={size}>{size}</option>
                            ))}
                        </select>

                        <label style={{marginLeft: "10px"}}>컬러: </label>
                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            <option value="">선택</option>
                            {availableColors.map((color, idx) => (
                                <option key={idx} value={color}>{color}</option>
                            ))}
                        </select>

                        <button onClick={handleOptionAdd} className="add-option-btn">추가</button>
                    </div>

                    <div className="option-list">
                        {selectedOptions.map((opt, index) => (
                            <div key={index} className="option-box">
                                <div className="option-info">{opt.size} / {opt.color}</div>
                                <div className="option-quantity">
                                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                                    <span>{opt.quantity}</span>
                                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                                </div>
                                <div className="option-price">
                                    {(ProductData.price * opt.quantity).toLocaleString()}원
                                </div>
                                <button className="remove-btn" onClick={() => removeOption(index)}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="product-btn-box">
                        <button className="buy-btn" onClick={() => handleSubmit(selectedOptions)}>
                            구매하기
                        </button>
                        <button className="product-cart-btn" onClick={() => handleAddToCart(selectedOptions)}>장바구니</button>
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
                <img src={ProductData.mainUrl} alt="product1" className="info-product-img"
                     onClick={() => changeImage(ProductData.mainUrl)}/>
                <img src={ProductData.image?.subUrl1 ?? "기본이미지.png"} alt="product2" className="info-product-img"
                     onClick={() => changeImage(ProductData.itemImg.subUrl1)}/>
                <img src={ProductData.image?.subUrl2 ?? "기본이미지.png"} alt="product3" className="info-product-img"
                     onClick={() => changeImage(ProductData.itemImg.subUrl2)}/>
                <img src={ProductData.image?.subUrl3 ?? "기본이미지.png"} alt="product4" className="info-product-img"
                     onClick={() => changeImage(ProductData.itemImg.subUrl3)} />
            </div>

            <div className="product-info-title">
                <a>상품 설명</a>
                <a>후기 (0)</a>
                <a>Q&N</a>
                <a>관련 상품</a>
            </div>

            <div className="product-info-box">
                <li>소재:겉감 - 100% nylon <span className="indent">안감 - 100% polyester (micro fleece)</span></li>
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
                            transition: 'transform 0.3s ease',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    />
                </button>

                <div className="image-container" style={{maxHeight: isExpanded ? 'none' : '400px'}}>
                    <img src={ProductData.mainUrl} alt="p-detail-img" className="p-detail-img" style={{marginTop: "96px"}}/>
                    <h1>DETAILS</h1>
                    <img src={ProductData.image?.detailUrl1 ?? "기본이미지.png"} alt="p-detail-img" className="p-detail-img"/>
                    <img src={ProductData.image?.detailUrl2 ?? "기본이미지.png"} alt="p-detail-img" className="p-detail-img" style={{marginTop: "64px"}}/>
                    <img src={ProductData.image?.detailUrl3 ?? "기본이미지.png"} alt="p-detail-img" className="p-detail-img" style={{marginTop: "64px"}}/>
                    <h2 style={{marginTop: "100px"}}>*상품의 색상은 모니터 해상도에 따라 실제 색상과 다소 차이가 있을 수 있으며 구매 전 상세 사진을 꼼꼼히 확인 바랍니다.</h2>
                    <img src={ProductData.image?.detailUrl4 ?? "기본이미지.png"} alt="p-detail-img" className="p-detail-img" style={{marginTop: "5px"}}/>
                </div>
            </div>
        </div>
    );
};

export default Product;