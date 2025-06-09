import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ProductHook = () => {
    const { id } = useParams();
    const [ ProductData, setProductData ] = useState({});
    const [ loading, setLoding ] = useState(true);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

        const handleSubmit = async (selectedOptions) => {
            if (!selectedOptions || selectedOptions.length === 0) {
                alert("사이즈와 컬러를 선택한 후 추가 버튼을 눌러주세요.");
                return;
            }

            const requestBody = selectedOptions.map(option => ({
                itemId: parseInt(id),
                size: option.size,
                color: option.color,
                quantity: option.quantity
            }));

            console.log("전송될 데이터:", requestBody);

            // ❌ 백엔드 연결 전이라면 아래 코드는 주석처리
            /*
            try {
                const response = await axios.post("/api/buy-items", requestBody);
                console.log("전송 결과:", response.data);
                navigate("/Payment", {
                    state: { productId: id, options: selectedOptions }
                });
            } catch (err) {
                console.error("구매 요청 실패:", err);
                setError(err);
            }
            */

            // 👉 Payment 페이지로 이동은 유지하거나 주석처리 선택 가능
            navigate("/Payment", {
                state: { productId: id, options: selectedOptions }
            });
        };


        useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/showItem/${id}`);
                console.log(response.data);
                setProductData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoding(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { ProductData, loading, error, handleSubmit };
}

export default ProductHook;