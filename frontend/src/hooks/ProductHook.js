import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductHook = () => {
    const { id } = useParams();
    const [ ProductData, setProductData ] = useState({ itemImg: {} });
    const [ loading, setLoding ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${id}`);
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

    return { ProductData, loading, error };
}

export default ProductHook;