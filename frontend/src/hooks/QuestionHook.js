import { useState } from "react";
import axios from "axios";

const QuestionHook = () => {
    const [questions, setQuestions] = useState([]);
    const [detailedQuestion, setDetailedQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. 문의 등록
    const addQuestion = async (data) => {
        try {
            const response = await axios.post("/api/questions/add", data, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 2. 문의 삭제
    const deleteQuestion = async (questionId) => {
        try {
            const response = await axios.delete(`/api/questions/deleteQuestion/${questionId}`, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 3. 문의 수정
    const updateQuestion = async (questionId, data) => {
        try {
            const response = await axios.put(`/api/questions/updateQuestion/${questionId}`, data, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 4. 답변 작성
    const writeAnswer = async (data) => {
        try {
            const response = await axios.post("/api/questions/answers/add", data, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 5. 답변 수정
    const updateAnswer = async (questionAnswerId, data) => {
        try {
            const response = await axios.put(`/api/questions/answers/updateAnswer/${questionAnswerId}`, data, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 6. 답변 삭제
    const deleteAnswer = async (questionAnswerId) => {
        try {
            const response = await axios.delete(`/api/questions/answers/deleteAnswer/${questionAnswerId}`, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    // 7. 상품별 문의 + 답변 조회
    const loadItemQuestions = async (itemId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/questions/item/${itemId}`, { withCredentials: true });
            setQuestions(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 8. 회원별 문의 조회
    const loadMemberQuestions = async (memberId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/questions/member/${memberId}`, { withCredentials: true });
            setQuestions(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 9. 문의 상세 조회
    const loadQuestionDetail = async (questionId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/questions/member/Detailed/${questionId}`, { withCredentials: true });
            setDetailedQuestion(response.data);
            return response.data ?? null;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        questions,
        detailedQuestion,
        loading,
        error,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        writeAnswer,
        updateAnswer,
        deleteAnswer,
        loadItemQuestions,
        loadMemberQuestions,
        loadQuestionDetail,
    };
};

export default QuestionHook;
