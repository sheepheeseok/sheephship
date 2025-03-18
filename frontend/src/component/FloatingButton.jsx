import { useState } from "react";

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleQuestionClick = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
    };

    return (
        <div className="floating-box" onClick={handleClick}>
            <div className="icon-container">
                {/* Question 아이콘은 fv-icon 왼쪽에 따로 배치 */}
                <img src="/icons/question-icon.svg" alt="question-icon" className="question-icon" onClick={handleQuestionClick}/>
            </div>
            <div className={`v-icon ${isOpen ? "open" : ""}`}>
                <img src="/icons/f-icon.svg" alt="ficon" className={`fv-icon ${isOpen ? "open" : ""}`} />
            </div>
            <div className={`f-icons ${isOpen ? "open" : ""}`}>
                <img src="/icons/facebook.svg" alt="f-Icon" className="f-icon"/>
                <img src="/icons/Insta.svg" alt="f-Icon" className="f-icon"/>
                <img src="/icons/icon3.svg" alt="f-Icon" className="f-icon"/>
            </div>
        </div>
    );
};

export default FloatingButton;
