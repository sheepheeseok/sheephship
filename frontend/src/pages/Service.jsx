import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionHook from "../hooks/QuestionHook.js";
import useCookie from "../hooks/useCookie.js";

const SERVICE = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const memberId = useCookie("loginId");
  const {
    questions,
    loadMemberQuestions,
    loading,
    error,
    loadQuestionDetail,
  } = QuestionHook();

  useEffect(() => {
    loadMemberQuestions(memberId); // 마운트 시 질문 데이터 불러오기
  }, [memberId]);

  const [openIndex, setOpenIndex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loadingAnswers, setLoadingAnswers] = useState({});

  const toggleAnswer = async (index, questionId) => {
    const res = await loadQuestionDetail(questionId);
    setAnswers(prev => ({ ...prev, [questionId]: res }));
    console.log("👉 요청한 questionId:", questionId);
    console.log("👉 API 응답:", res);
    const isOpen = openIndex === index;
    if (isOpen) {
      setOpenIndex(null);
      return;
    }

    if (answers[questionId]) {
      setOpenIndex(index);
      return;
    }

    try {
      setLoadingAnswers(prev => ({ ...prev, [questionId]: true }));
      const res = await loadQuestionDetail(questionId);
      setAnswers(prev => ({ ...prev, [questionId]: res }));
      setOpenIndex(index);
    } catch (err) {
      console.error("답변 불러오기 실패", err);
    } finally {
      setLoadingAnswers(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="container">
      <div className="customerService">
        <h1 className="service-title">고객센터</h1>
        <p className="subtitle">어려움이나 궁금한 점이 있으신가요?</p>

        <div className="questionList">
          {loading ? (
              <div>로딩 중...</div>
          ) : error ? (
              <div>오류 발생: {error.message}</div>
          ) : (
              questions.map((question, index) => {
                const questionId = question.questionId;
                const isOpen = openIndex === index;
                const answerData = answers[questionId];
                const isAnswerLoading = loadingAnswers[questionId];

                const hasAnswer =
                    answerData &&
                    (answerData.answerTitle || answerData.answerContent);

                return (
                    <div
                        key={questionId}
                        className="question-detail-box clickable"
                        onClick={() => toggleAnswer(index, questionId)}
                    >
                      {/* 질문 영역 */}
                      <div className="question-block">
                        <div className="content"
                             style={{fontFamily: "NotoSansKR-Bold"}}>{question.title}</div>
                        <div className="content" style={{ marginBottom: "10px"}}>{question.content}</div>
                        <div className="meta">
                          <span className="author">{question.memberId}</span>
                          <span className="date">{question.writeDateTime.substring(0, 10) || '날짜 없음'}</span>
                        </div>
                      </div>

                      {/* 답변 영역 */}
                      {isOpen && (
                          <div className="answer-block">
                            <div className="Recent-Line2" style={{marginBottom: "40px", color: "#cccccc", height: "0.5px"}}/>
                            {isAnswerLoading ? (
                                <div className="content">답변 불러오는 중...</div>
                            ) : hasAnswer ? (
                                <>
                                  <div className="content" style={{
                                    marginBottom: "10px",
                                    fontFamily: "NotoSansKR-Bold",
                                    fontSize: "13px"
                                  }}>{answerData.answerTitle}</div>
                                  <div className="content" style={{fontSize: "13px", marginBottom: "30px",}}>{answerData.answerContent}</div>
                                  <div className="meta">
                                    <span className="author"
                                          >{answerData.adminId || '관리자'}</span>
                                    <span className="date">
                  {answerData.answerWriteDateTime?.substring(0, 10) || '날짜 없음'}
                </span>
                                  </div>
                                </>
                            ) : (
                                <div className="content">답변이 등록되지 않았습니다.</div>
                            )}
                          </div>
                      )}
                    </div>
                );
              })
          )}
        </div>
        <div className="service-pagination">
          {[1, 2, 3, 4, 5].map((page) => (
              <span
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
              >
              {page}
            </span>
          ))}
          <span className="next">{'>'}</span>
        </div>
      </div>
    </div>
  );
};
export default SERVICE;
