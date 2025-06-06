import { useState, useEffect } from "react";

const Recent = () => {
  const [recentItems, setRecentItems] = useState(() => {
    const saved = localStorage.getItem("recentItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("recentItems", JSON.stringify(recentItems));
  }, [recentItems]);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setRecentItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleDeleteAll = () => {
    setRecentItems([]);
    setSelectedItems([]);
  };

  const handleDeleteOne = (id) => {
    setRecentItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = recentItems.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(recentItems.length / itemsPerPage);

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
                    src={item.img}
                    alt={item.title}
                    className="recent-item-img"
                  />
                  <div className="Recent-Item-Info">
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                  </div>

                  <div className="Recent-Actions">
                      <button className="btn-cart">장바구니</button>
                      <button className="btn-order">주문하기</button>
                      <button className="btn-delete" onClick={() => handleDeleteOne(item.id)}>삭제</button>
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
