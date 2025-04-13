import { useState } from "react";

const LoginHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (id, password) => {
        setLoading(false);
        setError(null);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, password }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("로그인 실패");
            }

            const data = await response.json();
            console.log("로그인 성공", data);
            return data;
        } catch(err){
            setError(err.message);
            console.error("로그인 오류", err);
            return null;
        } finally {
            setLoading(false);
        }
    }
    return { login, loading, error };
}

export default LoginHook;