import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ShopHook = (category, page) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/getItembyCategory/${category}/${page}`);
                setProducts(res.data.listByCategory);
                setTotalCount(res.data.page); // 전체 상품 개수 (페이지 수 아님)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, page]);

    const handleClickProduct = async (itemId) => {
        try {
            // ✅ 최근 본 상품 등록 (쿠키에 저장)
            await axios.post(`/api/recent/add/${itemId}`, null, {
                withCredentials: true,
            });
        } catch (err) {
            console.error("최근 본 상품 등록 실패:", err);
            // 실패하더라도 상세페이지로 이동
        }

        // ✅ 상세 페이지로 이동
        navigate(`/Product/${itemId}`);
    };

    return { handleClickProduct, products, totalCount, loading, error };
};

export default ShopHook;
