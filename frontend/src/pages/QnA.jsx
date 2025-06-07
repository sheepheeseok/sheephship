import { useState } from "react";

const QnA = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { question: "클라이밍장 어디에 좋아요? / 클라이밍으로 다이어트 할 수 있나요?",
            answer: "클라이밍은 팔다리 근육 뿐만 아니라 몸의 중심 근육을 많이 사용하는 전신근력 운동입니다.\n몸의 근육을 사용하는 범위가 넓어 고관절, 다리, 허리의 유연성 증대에도 좋습니다.\n집중해서 운동하면 시간당 900kcal를 소모하여 다이어트 효과가 큽니다.",
            category: "클라이밍이란?" },
        { question: "제가 팔에 힘이 없는데 클라이밍을 할 수 있나요?",
            answer: "네! 클라이밍은 기술과 균형이 중요한 운동으로, 힘이 적더라도 충분히 즐길 수 있습니다.",
            category: "클라이밍이란?" },
        { question: "클라이밍짐에 올 때는 어떤 의상을 준비하면 좋을까요?",
            answer: "편한 운동복과 전용 클라이밍화를 준비하면 좋습니다.",
            category: "클라이밍이란?" },
        { question: "체격이 큰데 할 수 있을까요?",
            answer: "클라이밍은 개인 수준에 맞춰 즐길 수 있는 운동입니다. 초보자 루트부터 시작하세요!",
            category: "클라이밍이란?" },
        { question: "나이가 어린데 혹은 나이가 많은데 운동할 수 있나요?",
            answer: "연령 제한 없이 누구나 클라이밍을 즐길 수 있습니다!",
            category: "클라이밍이란?" },
        { question: "클라이밍 할 때 따로 준비해야하는 장비가 있나요?",
            answer: "전용 클라이밍화, 초크백, 하네스 등이 필요할 수 있습니다.",
            category: "클라이밍이란?" },
        { question: "떨어지면 다치지 않나요?",
            answer: "안전 장비와 매트가 잘 갖춰져 있어 안전하게 즐길 수 있습니다.",
            category: "클라이밍이란?" },
        { question: "한 번 체험해보고 싶은데 아무때나 가면 되나요?",
            answer: "센터마다 운영 시간이 다르므로 방문 전 확인해주세요!",
            category: "클라이밍이란?" },
        { question: "네일아트 했는데 해도 되나요?",
            answer: "손을 적극적으로 사용하는 운동이므로 손톱에 네일아트가 있다면 다칠 위험이 있습니다.",
            category: "클라이밍이란?" }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경 시 첫 번째 페이지로 리셋
    };

    // 선택된 카테고리와 일치하는 FAQ만 필터링
    const filteredFaqs = selectedCategory === "전체"
        ? faqs
        : faqs.filter(faq => faq.category === selectedCategory);

    // 페이지네이션: 페이지별로 표시할 항목들
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="qna-container">
            <h1 className="faq-title">Q&A</h1>
            <p className="faq-subtitle">어려움이나 궁금한 점이 있으신가요?</p>

            {/* 카테고리 버튼 */}
            <div className="faq-category-buttons">
                <button
                    className={`faq-category-button ${selectedCategory === "전체" ? "active" : ""}`}
                    onClick={() => handleCategoryClick("전체")}
                >
                    전체
                </button>
                <button
                    className={`faq-category-button ${selectedCategory === "클라이밍이란?" ? "active" : ""}`}
                    onClick={() => handleCategoryClick("클라이밍이란?")}
                >
                    클라이밍이란?
                </button>
                <button
                    className={`faq-category-button ${selectedCategory === "상품 문의" ? "active" : ""}`}
                    onClick={() => handleCategoryClick("상품 문의")}
                >
                    상품 문의
                </button>
                <button
                    className={`faq-category-button ${selectedCategory === "회원정보" ? "active" : ""}`}
                    onClick={() => handleCategoryClick("회원정보")}
                >
                    회원정보
                </button>
                <button
                    className={`faq-category-button ${selectedCategory === "주문/결제" ? "active" : ""}`}
                    onClick={() => handleCategoryClick("주문/결제")}
                >
                    주문/결제
                </button>
            </div>

            {/* SERVICE 리스트 */}
            <div className="faq-container">
                {currentItems.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openIndex === index ? "open" : ""}`}
                    >
                        <button
                            className={`faq-question ${openIndex === index ? "open" : ""}`}
                            onClick={() => toggleAnswer(index)}
                        >
                            <span>
                                <span className="faq-q">Q</span>
                                {faq.question}
                            </span>
                            <span className={`faq-arrow ${openIndex === index ? "open" : ""}`}>
                                {openIndex === index ? "" : ""}
                            </span>
                        </button>
                        <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
                            {faq.answer.split("\n").map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="faq-pagination">
                <button className="page-btn" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>«</button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                    <button key={num} className={`page-btn ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>
                        {num}
                    </button>
                ))}
                <button className="page-btn" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>»</button>
            </div>
        </div>
    );
};

export default QnA;
