import { useState, useEffect } from "react";
import axios from "axios";

const RecentHook= () => {
    const [recentItems, setRecentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecentItems = async () => {
        try {
            const response = await axios.get("/api/recent/list", {
                withCredentials: true,
            });
            console.log("상품 데이터", response.data)
            setRecentItems(response.data);
        } catch (err) {
            console.error("최근 본 상품 조회 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecentItems();
    }, []);

    return { recentItems, loading, error, reload: fetchRecentItems };
};

export default RecentHook;
