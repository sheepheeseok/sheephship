import {useState, useEffect, useRef} from "react";
import axios from "axios";

const ChatbotPopup = ({ isVisible }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatBodyRef = useRef(null); // 📌 스크롤용 ref

    // 입력 프리뷰 메시지 반영
    useEffect(() => {
        const hasPreview = messages.some(msg => msg.role === "user" && msg.content === "...");
        if (input.trim() && !hasPreview) {
            setMessages(prev => [...prev, { role: "user", content: "..." }]);
        } else if (!input.trim() && hasPreview) {
            setMessages(prev => prev.filter(msg => !(msg.role === "user" && msg.content === "...")));
        }
    }, [input]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", content: input };

        // 현재 프리뷰(...) 제거하고 실제 메시지로 교체
        const filteredMessages = messages.filter(msg => !(msg.role === "user" && msg.content === "..."));
        const newMessages = [...filteredMessages, userMsg];
        setMessages([...newMessages, { role: "assistant", content: "..." }]); // 로딩 메시지
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("/api/chat", newMessages); // 백엔드 직접 호출
            const botReply = response.data.choices[0].message.content;

            setMessages([...newMessages, { role: "assistant", content: botReply }]);
        } catch (err) {
            console.error("❌ OpenAI 호출 실패:", err);
            setMessages([...newMessages, { role: "assistant", content: "오류가 발생했어요." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`chatbot-popup ${isVisible ? 'visible' : ''}`}>
            <div className="chat-header">챗봇 양</div>
            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-msg ${msg.role}`}>
                        {msg.role === "assistant" && (
                            <img
                                src="/icons/chatbotlogo.png" // ← 여기에 원하는 챗봇 이미지 경로
                                alt="챗봇"
                                className="chat-avatar"
                            />
                        )}
                        <span>{msg.content}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input-area">
            <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} disabled={loading}>전송</button>
            </div>
        </div>
    );
};

export default ChatbotPopup;
