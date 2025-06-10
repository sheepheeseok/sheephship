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

        // ✅ 백엔드에 맞게 itemDetailId와 quantity 포함
        const requestBody = selectedOptions.map(option => ({
            itemDetailId: option.itemDetailId,  // 반드시 이 값으로 보내야 백엔드가 인식함
            color: option.color,
            size: option.size,
            stockQuantity: option.quantity,
            itemId: id,
        }));

        console.log("전송될 데이터:", requestBody);

        try {
            const response = await axios.post(
                "/api/buy-items",
                requestBody,
                { withCredentials: true }
            );

            console.log("전송 결과:", response.data);

            navigate("/Payment", {
                state: {
                    productId: id,
                    selectedOptions: requestBody,
                }
            });
        } catch (err) {
            console.error("구매 요청 실패:", err);
            setError(err);
        }
    };


        useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/showItem/${id}`);
                console.log("상품 전체 응답:", response.data);
                setProductData(response.data);

                // 예: 첫 번째 옵션의 itemDetailId 확인
                if (response.data.colors && response.data.colors.length > 0) {
                    console.log("첫 옵션의 itemDetailId:", response.data.colors[0].itemDetailId);
                }
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