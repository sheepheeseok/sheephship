import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import useCookie from "./useCookie.js";
import CartHook from "../hooks/CartHook.js";

const ProductHook = () => {
    const { cartList, reloadCartList } = CartHook();
    const { id } = useParams();
    const [ ProductData, setProductData ] = useState({});
    const [ loading, setLoding ] = useState(true);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();
    const memberId = useCookie("loginId");

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

    const handleAddToCart = async (selectedOptions) => {
        if(!selectedOptions || selectedOptions.length === 0) {
            alert("사이즈와 컬러를 선택한 후 장바구니 버튼을 눌러주세요.");
            return;
        }

        const isDuplicate = cartList.some(cartItem =>
            cartItem.itemId === Number(id) &&
            selectedOptions.some(opt =>
                cartItem.size === opt.size && cartItem.color === opt.color
            )
        );

        if (isDuplicate) {
            alert("이미 장바구니에 담긴 상품입니다.");
            return;
        }

        const requestBody = selectedOptions.map(option => ({
            memberId: memberId,
            itemId: id,
            count: option.quantity,
            size: option.size,
            color: option.color
        }));

        console.log("장바구니 전송 데이터:", requestBody);

        try {
            const response = await axios.put(
                "/api/addCart",
                requestBody[0],
                { withCredentials: true }
            );
            console.log("장바구니 추가 성공", response.data);
            alert("장바구니에 상품이 담겼습니다.");
            navigate("/Cart");
        } catch(err) {
            console.error("장바구니 추가 실패", err);
            alert("장바구니 추가에 실패했습니다.");
        }
    }


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

    return { ProductData, loading, error, handleSubmit, handleAddToCart };
}

export default ProductHook;