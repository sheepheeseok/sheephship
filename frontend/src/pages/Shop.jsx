import { useState, useEffect } from "react";
import ShopHook from "../hooks/ShopHook.js";

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState("ALL");

    const category = activeMenu;

    const { products = [], totalCount = 1, loading, error, handleClickProduct, addWish, handleAddToWishList } = ShopHook(category, currentPage);

    const productsPerPage = 16;
    const totalPages = Math.max(1, Math.ceil(totalCount / productsPerPage));

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setCurrentPage(1); // ✅ 카테고리 바뀔 때 페이지 초기화
    };

    console.log(products);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <div className="shop-container">
                <ul className="shop-menu">
                    {["ALL", "BOTTOM", "TOP", "CHALK BAGS", "ACC", "SKIN CARE"].map((menu) => (
                        <li key={menu} className={activeMenu === menu ? "active" : ""} onClick={() => handleMenuClick(menu)}>
                            <a href="#">{menu}</a>
                        </li>
                    ))}
                </ul>

                <section className="product-list">
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p>상품을 불러오는 중 오류가 발생했습니다.</p>
                    ) : (
                        products.map((product) => (
                            <div
                                className="product-item"
                                key={product.itemId}
                                onClick={() => handleClickProduct(product.itemId)}
                                style={{cursor: "pointer"}}
                            >
                                <img src={product.mainUrl} alt={product.name}/>
                                <p>{product.name}</p>
                                <strong>{product.price}원</strong>
                                <button className="wish-btn" onClick={(e
                                ) => {
                                    e.stopPropagation();
                                    handleAddToWishList(product);
                                }}>WISH
                                </button>
                                <button className="add-btn">ADD</button>
                            </div>
                        ))
                    )}
                </section>

                <div className="shop-pagination">
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => {
                        const num = idx + 1;
                        return (
                            <button
                                key={num}
                                className={`page-btn ${currentPage === num ? 'active' : ''}`}
                                onClick={() => setCurrentPage(num)}
                            >
                                {num}
                            </button>
                        );
                    })}
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shop;
