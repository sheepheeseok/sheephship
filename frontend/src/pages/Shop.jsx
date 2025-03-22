import { useState } from "react";

const allProducts = [
    { id: 1, title: "와이드 턱 팬츠 스프링 믹스", price: "92,000원", img: "/imgs/shop/pants1-1.jpg", hoverImg: "/imgs/shop/pants1-2.jpg" },
    { id: 2, title: "[무료배송] 오름 클라이밍 스타터 키트 (파인초크)", price: "45,000원", img: "/imgs/InstaBox/insta5.png", hoverImg: "/imgs/InstaBox/insta5.png" },
    { id: 3, title: "[무료배송] 오름 클라이밍 스타터 키트 (크러쉬드)", price: "45,000원", sale: "55,000원", img: "/imgs/InstaBox/insta6.png", hoverImg: "/imgs/InstaBox/insta6_hover.png" },
    { id: 4, title: "오름 리필러블 초크볼 (65g)", price: "6,000원", img: "/imgs/InstaBox/insta7.png", hoverImg: "/imgs/InstaBox/insta7_hover.png" },
    { id: 5, title: "상품5", price: "50,000원", img: "/imgs/InstaBox/insta4.png" },
    { id: 6, title: "상품6", price: "60,000원", img: "/imgs/InstaBox/insta8.png" },
    { id: 7, title: "상품7", price: "70,000원", img: "/imgs/InstaBox/insta1.png" },
    { id: 8, title: "상품8", price: "80,000원", img: "/imgs/InstaBox/insta2.png" },
    { id: 9, title: "상품9", price: "50,000원", img: "/imgs/InstaBox/insta9.png" },
    { id: 10, title: "상품10", price: "60,000원", img: "/imgs/InstaBox/insta10.png" },
    { id: 11, title: "상품11", price: "70,000원", img: "/imgs/InstaBox/insta11.png" },
    { id: 12, title: "상품12", price: "80,000원", img: "/imgs/InstaBox/insta12.png" },
    { id: 13, title: "상품13", price: "60,000원", img: "/imgs/InstaBox/insta13.png" },
    { id: 14, title: "상품14", price: "70,000원", img: "/imgs/InstaBox/insta14.png" },
    { id: 15, title: "상품15", price: "80,000원", img: "/imgs/InstaBox/insta15.png" },
    { id: 16, title: "상품16", price: "60,000원", img: "/imgs/InstaBox/insta16.png" },
    { id: 17, title: "상품17", price: "70,000원", img: "/imgs/InstaBox/insta17.png" },
    { id: 18, title: "상품18", price: "80,000원", img: "/imgs/InstaBox/insta18.png" },
];

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState("ALL");
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const productsPerPage = 16;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

            <section className="product-list">
                {currentProducts.map((product) => (
                    <div className="product-item" key={product.id}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}>
                        <img src={hoveredProduct === product.id ? product.hoverImg : product.img} alt={product.title} />
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

            <div className="pagination">
                <button className="page-btn" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>«</button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                    <button key={num} className={`page-btn ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>
                        {num}
                    </button>
                ))}
                <button className="page-btn" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>»</button>
            </div>
        </div>
    );
};

export default Shop;
