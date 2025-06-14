import { useState } from "react";
import useRecentItems from "../../hooks/RecentHook.js"; // 백엔드 연동용 훅

const Recent = () => {
  const { recentItems, loading } = useRecentItems();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = recentItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recentItems.length / itemsPerPage);

  if (loading) return <div>로딩 중...</div>;

  return (
      <>
        <div className="Recent-title">
          <h1>최근 본 상품</h1>
        </div>
        <div className="Recent-Line" />

        <div className="Recent-Area">
          {recentItems.length === 0 ? (
              <>
                <img
                    src="/icons/mypage-noneIcon.svg"
                    alt="noneIcon"
                    className="Recent-NoneIcon"
                />
                <h1>최근 본 상품 내역이 없습니다.</h1>
                <div className="Recent-Line2" />
              </>
          ) : (
              <>
                <div className="Recent-Items">
                  {currentItems.map((item) => (
                      <div key={item.id} className="Recent-Item">
                        <img
                            src={item.mainUrl}
                            alt={item.name}
                            className="recent-item-img"
                        />
                        <div className="Recent-Item-Info">
                          <p>{item.name}</p>
                          <p>{item.price.toLocaleString()}원</p>
                        </div>
                        <div className="Recent-Actions">
                          <button className="btn-cart">장바구니</button>
                          <button className="btn-order">주문하기</button>
                          {/* 삭제 기능은 서버와 연동되지 않으므로 현재는 숨김 */}
                          {/* <button className="btn-delete" onClick={() => handleDeleteOne(item.id)}>삭제</button> */}
                        </div>
                      </div>
                  ))}
                </div>
              </>
          )}

          {totalPages > 1 && (
              <div className="Recent-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                ))}
              </div>
          )}
        </div>
      </>
  );
};

export default Recent;
