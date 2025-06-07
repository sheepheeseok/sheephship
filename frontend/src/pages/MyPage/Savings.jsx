import React, { useState } from "react";

const ITEMS_PER_PAGE = 5;

const Savings = ({ orders }) => {
  const [tab, setTab] = useState("적립내역");
  const [page, setPage] = useState(1);

  // 합계 계산
  const totalSaved = orders.filter(o => o.type === "적립").reduce((sum, o) => sum + o.point, 0);
  const totalUsed = orders.filter(o => o.type === "사용").reduce((sum, o) => sum + o.point, 0);
  const totalPending = orders.filter(o => o.type === "미가용").reduce((sum, o) => sum + o.point, 0);
  const totalAvailable = totalSaved - totalUsed;

  // 탭별 리스트
  const tabMap = {
    "적립내역": "적립",
    "사용내역": "사용",
    "미가용적립내용": "미가용"
  };
  const filteredList = orders.filter(o => o.type === tabMap[tab]);
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentList = filteredList.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // 탭 변경 시 페이지 초기화
  React.useEffect(() => { setPage(1); }, [tab]);

  return (
    <div className="savings-root">
      <div className="savings-content">
        <div className="savings-title">적립금</div>
        <div className="savings-title-underline" />
        <div className="savings-summary-box">
          <div className="savings-summary-row">
            <span>총 적립금</span>
            <span>{totalSaved.toLocaleString()}원</span>
          </div>
          <div className="savings-summary-row">
            <span>사용 가능 적립금</span>
            <span>{totalAvailable.toLocaleString()}원</span>
          </div>
          <div className="savings-summary-row">
            <span>미가용 적립금</span>
            <span>{totalPending.toLocaleString()}원</span>
          </div>
          <div className="savings-summary-row">
            <span>사용된 적립금</span>
            <span>{totalUsed.toLocaleString()}원</span>
          </div>
        </div>

        <div className="savings-info">
          <ul>
            <li>주문으로 발생한 적립금은 배송완료 후 7일 부터 실제 사용 가능한 적립금으로 전환됩니다.</li>
            <li>미가용 적립금은 반품, 구매취소 등을 대비한 임시 적립금으로 사용가능 적립금으로 전환되기까지 상품구매에 사용하실 수 없습니다.</li>
            <li>사용가능 적립금은 상품구매 시 바로 사용가능합니다.</li>
          </ul>
        </div>

        <div className="savings-tab-row-wrap">
          <div className="savings-tab-row">
            <button className={tab === "적립내역" ? "active" : ""} onClick={() => setTab("적립내역")}>적립내역</button>
            <button className={tab === "사용내역" ? "active" : ""} onClick={() => setTab("사용내역")}>사용내역</button>
            <button className={tab === "미가용적립내용" ? "active" : ""} onClick={() => setTab("미가용적립내용")}>미가용적립내용</button>
          </div>
          <div className="savings-tab-underline" />
        </div>

        {/* 탭별 내역 */}
        {filteredList.length === 0 ? (
          <div className="savings-empty">
            <div className="savings-empty-icon">
              <img src="/icons/mypage-noneIcon.svg" alt="noneIcon" className="mypage-NoneIcon" />
            </div>
            <div className="savings-empty-text">{tab}이 없습니다.</div>
            <div className="savings-bottom-line" />
          </div>
        ) : (
          <>
            <div className="savings-list">
              {currentList.map((item) => (
                <div className="savings-item" key={item.id}>
                  <div className="savings-item-title">
                    {tab === "적립내역" && "주문적립"}
                    {tab === "사용내역" && "사용내역"}
                    {tab === "미가용적립내용" && "미가용적립"}
                  </div>
                  <div className="savings-item-name">{item.name}</div>
                  <div className="savings-item-date">
                    {tab === "적립내역" && <>적립 - {item.date} ({item.expire} 소멸 예정)</>}
                    {tab === "사용내역" && <>사용 - {item.date}</>}
                    {tab === "미가용적립내용" && <>미가용 - {item.date}</>}
                  </div>
                  <div className="savings-item-point">
                    {tab === "사용내역" ? "-" : "+"}
                    {item.point ? item.point.toLocaleString() : "0"}원
                  </div>
                </div>
              ))}
            </div>
            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="savings-pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <span
                    key={i}
                    className={page === i + 1 ? "active" : ""}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Savings;