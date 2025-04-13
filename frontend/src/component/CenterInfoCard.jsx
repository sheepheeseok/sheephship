const CenterInfoCard = () => {
    return (
        <div className="CenterCard-container">
            <img src="/imgs/center/TheClimbCardImg.png" alt="CenterCardImg"/>
            <div className="CenterCard-info">
                <h1 style={{paddingLeft: "10px"}}>더클라임 B 홍대점</h1>
                <img src="/imgs/center/TheClimbLocation.png" alt="CenterInfo" className="Center-Location"/>
            </div>
            <h1>주차 • 샤워실 • Wi-fi</h1>
            <img src="/icons/CenterCardVector.svg" alt="CenterInfo" className="CenterCard-Vector"/>
        </div>
    )
}

export default CenterInfoCard;