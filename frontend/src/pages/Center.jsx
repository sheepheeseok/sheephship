import { useState } from "react";
import CenterInfoCard from "../component/CenterInfoCard.jsx";

const Center = () => {
    const [CenterSelected, setCenterSelected] = useState("더 클라임");

    const circleColors = ["#FFFFFF", "#FFF600", "#FFBB00", "#00A806", "#0095FF", "#FF0000", "#9900FF", "#888888"];


    const CenterName = [
        ["더 클라임", "클라이밍 파크"],
        ["손상원 클라이밍", "서울숲 클라이밍"],
        ["알레 클라이밍", ""]];

    const icons = [
        { id: 1, src: "/icons/centerStar.svg", alt: "아이콘1", onClick: () => alert("아이콘 1 클릭!") },
        { id: 2, src: "/icons/centerShare.svg", alt: "아이콘2", onClick: () => alert("아이콘 2 클릭!") },
        { id: 3, src: "/icons/centerBmark.svg", alt: "아이콘3", onClick: () => alert("아이콘 3 클릭!") },
        { id: 4, src: "/icons/centerInsta.svg", alt: "아이콘4", onClick: () => alert("아이콘 4 클릭!") },
    ];

    const [IconselectedId, setIconSelectedId] = useState(null);

    const IconClick = (icon) => {
        setIconSelectedId(icon.id); // 선택된 아이콘 ID 업데이트
        icon.onClick(); // 개별 아이콘의 클릭 이벤트 실행
    };

    const handleClick = (CenterName) => {
        setCenterSelected(CenterName);
    };

    return (<div className="container">
        <div className="center-container">
            <div className="center-header">
                <img src="/imgs/CenterHeader.png" alt="CenterHeaderImg" className="center-header"/>

                <div className="centername-container">
                    {CenterName.map((row, rowIndex) => (<div className="centername-row" key={rowIndex}>
                            {row.map((CenterName, index) => (
                                <span key={index} onClick={() => handleClick(CenterName)}
                                      className={`centername ${CenterSelected === CenterName ? "selected" : ""}`}>
                                        {CenterName}
                                    </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="center-line"/>

            <div className="center-body">
                {CenterSelected === "더 클라임" && (
                    <div className="center-content">
                        <img src="/imgs/center/TheClimbMainURL.png" alt="centerMainimg" className="center-body"/>
                        <div className="center-markBox">
                            <div className="center-btnBox">
                                {icons.map((icon) => (
                                    <div key={icon.id} className={`centericon-box ${IconselectedId === icon.id ? "selected" : ""}`}
                                         onClick={() => IconClick(icon)}>
                                        <img src={icon.src} alt={icon.alt} />
                                    </div>
                                ))}
                            </div>
                            <div className="center-levelBox">
                                <div className="center-level">
                                    <h1>난이도</h1>
                                    <div className="center-levelLine"/>
                                    <div className="center-circleContainer">
                                        {circleColors.map((color, index) => (
                                            <div key={index} className="center-circle"
                                                 style={{backgroundColor: color}}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="center-levelBar">
                                    <img src="/icons/centerFire.svg" alt="centerLevelIcon" className="center-levelBar"/>
                                    <div className="center-bar">
                                        <div className="center-arrow"></div>
                                    </div>
                                    <img src="/icons/centerFire.svg" alt="centerLevelIcon" className="center-largeIcon"
                                         style={{marginLeft: "16px"}}/>
                                </div>
                            </div>
                        </div>

                        <div className="center-infoBox">
                            <div className="center-infoCardBox">
                                <CenterInfoCard/>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
        </div>
    )
}

export default Center;