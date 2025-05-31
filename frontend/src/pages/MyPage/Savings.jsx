import React, { useState } from "react";

const ITEMS_PER_PAGE = 5;

const Savings = ({ orders }) => {
  const [tab, setTab] = useState("적립내역");
  const [page, setPage] = useState(1);

  // 페이지네이션 계산
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const currentList = orders.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="savings-root">
      <div className="savings-content">
        <div className="savings-title">적립금</div>
        <div className="savings-title-underline" />
        <div className="savings-summary-box">
          <div className="savings-summary-row">
            <span>총 적립금</span>
            <span>0원</span>
          </div>
          <div className="savings-summary-row">
            <span>사용 가능 적립금</span>
            <span>0원</span>
          </div>
          <div className="savings-summary-row">
            <span>미가용 적립금</span>
            <span>0원</span>
          </div>
          <div className="savings-summary-row">
            <span>사용된 적립금</span>
            <span>0원</span>
          </div>
        </div>

        <div className="savings-info">
          <ul>
            <li>
              주문으로 발생한 적립금은 배송완료 후 7일 부터 실제 사용 가능한
              적립금으로 전환됩니다.
            </li>
            <li>
              미가용 적립금은 반품, 구매취소 등을 대비한 임시 적립금으로
              사용가능 적립금으로 전환되기까지 상품구매에 사용하실 수 없습니다.
            </li>
            <li>사용가능 적립금은 상품구매 시 바로 사용가능합니다.</li>
          </ul>
        </div>

        <div className="savings-tab-row-wrap">
          <div className="savings-tab-row">
            <button
              className={tab === "적립내역" ? "active" : ""}
              onClick={() => setTab("적립내역")}
            >
              적립내역
            </button>
            <button
              className={tab === "사용내역" ? "active" : ""}
              onClick={() => setTab("사용내역")}
            >
              사용내역
            </button>
            <button
              className={tab === "미가용적립내용" ? "active" : ""}
              onClick={() => setTab("미가용적립내용")}
            >
              미가용적립내용
            </button>
          </div>
          <div className="savings-tab-underline" />
        </div>

        {/* 적립내역 탭 */}
        {tab === "적립내역" && (
          <>
            {orders.length === 0 ? (
              <div className="savings-empty">
                <div className="savings-empty-icon">
                  <img
                    src="/icons/mypage-noneIcon.svg"
                    alt="noneIcon"
                    className="mypage-NoneIcon"
                  />
                </div>
                <div className="savings-empty-text">적립금 내역이 없습니다.</div>
              </div>
            ) : (
              <>
                <div className="savings-list">
                  {currentList.map((item) => (
                    <div className="savings-item" key={item.id}>
                      <div className="savings-item-title">주문적립</div>
                      <div className="savings-item-name">{item.name}</div>
                      <div className="savings-item-date">
                        적립 - {item.date} ({item.expire} 소멸 예정)
                      </div>
                      <div className="savings-item-point">
                        +{item.point ? item.point.toLocaleString() : "0"}원
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
          </>
        )}

        <div className="savings-bottom-line" />
      </div>
    </div>
  );
};

export default Savings;
