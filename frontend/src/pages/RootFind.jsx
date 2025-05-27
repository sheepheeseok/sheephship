import React from "react";

const gyms = [
  {
    name: "더 클라임",
    instagram: "Instagram_theclimb",
  },
  {
    name: "클라이밍 파크",
    instagram: "Instagram_climbingpark",
  },
  {
    name: "손상원 클라이밍",
    instagram: "Instagram_sonsangwon",
  },
  {
    name: "서울숲 클라이밍",
    instagram: "Instagram_seoulforest",
  },
  {
    name: "알레 클라이밍",
    instagram: "Instagram_alleclimbing",
  },
];

const RootFindPage = () => {
  return (
    <div className="rootfind-page">
      <div className="rootfind-title">ROOT FIND</div>
      <div className="rootfind-desc">홀드를 잡기 전에 루트를 잡아야 한다.</div>

      <div className="rootfind-gyms">
        {gyms.map((gym, idx) => (
          <div className="gym-group" key={idx}>
            <div className="gym-name">{gym.name}</div>
            <div className="gym-instagram">
              <span className="insta-icon" />
              <span className="insta-text">{gym.instagram}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RootFindPage;
