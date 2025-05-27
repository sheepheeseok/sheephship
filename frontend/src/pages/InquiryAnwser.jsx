import React from "react";

const InquiryAnswerPage = () => {
  return (
    <div className="inquiry-answer-page">
      <div className="inquiry-answer-container">
        <h2 className="page-title">문의 답변</h2>

        <div className="content-section">
          <div className="section-header">
            <span className="section-title">내용</span>
            <span className="writer-date">김수호/2025.03.25</span>
          </div>

          <div className="inquiry-content">
            오일 하고 링을 같이 사려구하는데요!!<br/>
            손가락 부상 및 염증 을 치료한다구<br/>
            통증 주사 맞은 경력이 있는데<br/>
            혹시 부작용 및 사용에 있어서 주의해야하나요?!<br/>
            효과가 있을까요..!? 판매중인 오일중에 빨간색 구입예정입니다
          </div>
        </div>

        <div className="answer-section">
          <div className="section-header">
            <span className="section-title">답변</span>
            <span className="writer-date">십십/2025.03.26</span>
          </div>

          <div className="answer-content">
            안녕하세요. 저희가 수입 판매 중인 크림프 오일은 아래 100% 천연 성품으로 만들어진 오일이며 보조용품이라고 보시면 됩니다.
            병원에서 처방 받을 때 사용하는 약품처럼 단번에 통증을 가라 앉혀 주지는 않습니다. 구매 전 먼저 알아 주시기 바랍니다.<br/><br/>

            Macadamia oil, vitis vinifera oil, Betula lenta (River Birch oil) oil, Copaifera officinalis (Copaiba oil) oil,
            Cinnamomum zeylanicum leaf (Cinnamon oil) oil.<br/><br/>

            부작용 관련하여서는 고객분들 마다 다를 수 있기 때문에 정확하게 의학적으로 설명 드리기 힘듭니다.
            다만, 지금까지 구매하신 고객분들에게 부작용에 관한 연락을 받지 못하였더 저희도 2년째 사용하고 있지만 부작용은 없었습니다.<br/><br/>

            Crimp oil 측에서 권장하는 사용 방법은 아래와 같습니다<br/><br/>

            흔들어 내용물을 섞은 다음 사용 합니다.<br/>
            3~4 방울을 부상 부위에 바르고 마사지 합니다.<br/>
            하루에 4번이상은 사용 하지 말 것.<br/>
            피부 외부에만 바를 것.<br/>
            임산부 혹은 7세 미만 아이는 사용 하지 말것.<br/><br/>

            위에 말씀드린 것과 오일을 사용하시더라도 단번에 효과를 보실 수는 없습니다.
            하지만 저도 중지와 약지에 부상이 있어 클라이밍 전/후로 사용 하였는데 현재는 많이 호전되었습니다.<br/><br/>

            모든 부상의 가장 좋은 방법은 꾸준한 치료 및 휴식일 듯 합니다.
            부상 및 염증이 심하시다면 휴식기를 가지시는 것이 좋을 것 같습니다.
            언제나 안전 오름하시고 꾸준히 치료하시어 호전 되시길 빌겠습니다.
          </div>
        </div>

        <a href="#" className="back-link">
          ＜ 마이페이지로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default InquiryAnswerPage;
