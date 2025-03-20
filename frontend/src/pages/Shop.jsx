import { useState } from "react";

const allProducts = [
    { id: 1, title: "와이드 턱 팬츠 스프링 믹스", price: "92,000원", img: "/imgs/InstaBox/insta3.png" },
    { id: 2, title: "[무료배송] 오름 클라이밍 스타터 키트 (파인초크)", price: "45,000원", sale: "55,000원", img: "/imgs/InstaBox/insta5.png" },
    { id: 3, title: "[무료배송] 오름 클라이밍 스타터 키트 (크러쉬드)", price: "45,000원", sale: "55,000원", img: "/imgs/InstaBox/insta6.png" },
    { id: 4, title: "오름 리필러블 초크볼 (65g)", price: "6,000원", img: "/imgs/InstaBox/insta7.png" },
    { id: 5, title: "상품5", price: "50,000원", img: "/imgs/InstaBox/insta4.png" },
    { id: 6, title: "상품6", price: "60,000원", img: "/imgs/InstaBox/insta8.png" },
    { id: 7, title: "상품7", price: "70,000원", img: "/imgs/InstaBox/insta1.png" },
    { id: 8, title: "상품8", price: "80,000원", img: "/imgs/InstaBox/insta2.png" },
];

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState("ALL");
    const productsPerPage = 16;

    // 현재 페이지에 맞는 상품 추출
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // 총 페이지 수
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    return (
        <div className="shop-container">
            <ul className="shop-menu">
                {["ALL", "BOTTOM", "TOP", "CHALK BAGS", "ACC", "SKIN CARE"].map((menu) => (
                    <li key={menu} className={activeMenu === menu ? "active" : ""} onClick={() => setActiveMenu(menu)}>
                        <a href="#">{menu}</a>
                    </li>
                ))}
            </ul>

            {/* 상품 리스트 */}
            <section className="product-list">
                {currentProducts.map((product) => (
                    <div className="product-item" key={product.id}>
                        <img src={product.img} alt={product.title} />
                        <p>{product.title}</p>
                        {product.sale ? (
                            <div className="price">
                                <span className="sale-price">{product.price}</span>
                                <span className="original-price">{product.sale}</span>
                            </div>
                        ) : (
                            <strong>{product.price}</strong>
                        )}
                        <button className="cart-btn">🛒 담기</button>
                    </div>
                ))}
            </section>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >«</button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                    <button
                        key={num}
                        className={`page-btn ${currentPage === num ? 'active' : ''}`}
                        onClick={() => setCurrentPage(num)}
                    >
                        {num}
                    </button>
                ))}

                <button
                    className="page-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >»</button>
            </div>
        </div>
    );
};

export default Shop;
