import { useState } from "react";

const QnA = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "클라이밍장 어디에 좋아요? / 클라이밍으로 다이어트 할 수 있나요?",
            answer: `클라이밍은 팔다리 근육 뿐만 아니라 몸의 중심 근육을 많이 사용하는 전신근력 운동입니다.
                     몸의 근육을 사용하는 범위가 넓어 고관절, 다리, 허리의 유연성 증대에도 좋습니다.
                     클라이밍은 집중해서 운동할 시에 시간 당 900kcal의 에너지를 소모하여, 체중감량 효과도 큽니다.`
        },
        { question: "제가 팔에 힘이 없는데 클라이밍을 할 수 있나요?", answer: "네! 클라이밍은 기술과 균형이 중요한 운동으로, 힘이 적더라도 충분히 즐길 수 있습니다." },
        { question: "클라이밍짐에 올 때는 어떤 의상을 준비하면 좋을까요?", answer: "편한 운동복과 전용 클라이밍화를 준비하면 좋습니다." },
        { question: "체격이 큰데 할 수 있을까요?", answer: "클라이밍은 개인 수준에 맞춰 즐길 수 있는 운동입니다. 초보자 루트부터 시작하세요!" },
        { question: "나이가 어린데 혹은 나이가 많은데 운동할 수 있나요?", answer: "연령 제한 없이 누구나 클라이밍을 즐길 수 있습니다!" },
        { question: "클라이밍 할 때 따로 준비해야하는 장비가 있나요?", answer: "전용 클라이밍화, 초크백, 하네스 등이 필요할 수 있습니다." },
        { question: "떨어지면 다치지 않나요?", answer: "안전 장비와 매트가 잘 갖춰져 있어 안전하게 즐길 수 있습니다." },
        { question: "한 번 체험해보고 싶은데 아무때나 가면 되나요?", answer: "센터마다 운영 시간이 다르므로 방문 전 확인해주세요!" },
        { question: "네일아트 했는데 해도 되나요?", answer: "손톱에 네일아트가 있다면 다칠 위험이 있습니다." }
    ];

    return (
        <div className="container">
            <div className="qna-container">
                <h1 className="faq-title">고객센터</h1>
                <p className="faq-subtitle">어려움이나 궁금한 점이 있으신가요?</p>

                <div className="faq-category-buttons">
                    {/* 카테고리 버튼 예시 */}
                    <button className="faq-category-button active">전체</button>
                    <button className="faq-category-button">FAQ</button>
                    <button className="faq-category-button">공지사항</button>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? "open" : ""}`}
                        >
                            <div className="faq-question" onClick={() => toggleAnswer(index)}>
                                <span>Q {faq.question}</span>
                                <span className={`faq-arrow ${openIndex === index ? "open" : ""}`}>
                                    {openIndex === index ? "▼" : "▶"}
                                </span>
                            </div>
                            <div className="faq-answer">
                                {/* answer에서 \n을 <br>로 변환하여 줄바꿈 적용 */}
                                {faq.answer.split("\n").map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-pagination">
                    <span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span>
                </div>
            </div>
        </div>
    );
};

export default QnA;