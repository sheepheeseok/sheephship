const CenterInfoCard = ({ imgSrc, branchName, onClick }) => {
  return (
    <div className="CenterCard-container" onClick={onClick}>
      <img src={imgSrc} alt="CenterCardImg" />
      <div className="CenterCard-info">
        <h1 style={{ paddingLeft: "10px" }}>{branchName}</h1>
        <img src="/imgs/center/TheClimbLocation.png" alt="CenterInfo" className="Center-Location" />
      </div>
      <h1>주차 • 샤워실 • Wi-fi</h1>
      <img src="/icons/CenterCardVector.svg" alt="CenterInfo" className="CenterCard-Vector" />
    </div>
  );
};

export default CenterInfoCard;
