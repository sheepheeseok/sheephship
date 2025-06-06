import { useState, useEffect } from "react";

const WishList = () => {
  const [wishItems, setWishItems] = useState(() => {
    const saved = localStorage.getItem("wishItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("wishItems", JSON.stringify(wishItems));
  }, [wishItems]);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishItems.length) {
      setSelectedItems([]); // 모두 해제
    } else {
      setSelectedItems(wishItems.map((item) => item.id)); // 모두 선택
    }
  };


  const handleDeleteAll = () => {
    setWishItems([]);
    setSelectedItems([]);
  };

  const handleDeleteOne = (id) => {
    setWishItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = wishItems.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(wishItems.length / itemsPerPage);

  return (
    <>
      <div className="WishList-title">
        <h1>나의 위시리스트</h1>
      </div>
      <div className="WishList-Line" />
      <div className="WishList-Area">
        {wishItems.length === 0 ? (
          <>
            <img
              src="/icons/mypage-noneIcon.svg"
              alt="noneIcon"
              className="WishList-NoneIcon"
            />
            <h1>관심 상품 내역이 없습니다.</h1>
            <div className="WishList-Line2" />
          </>
        ) : (
          <>
            <div className="WishList-Items">
              {currentItems.map((item) => (
                <div key={item.id} className="WishList-Item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="wishlist-item-img"
                  />
                  <div className="WishList-Item-Info">
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                  </div>
                  <button
                    className="WishList-Item-Delete"
                    onClick={() => handleDeleteOne(item.id)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div className="WishList-Actions">
              <button onClick={handleSelectAll}>
                  {selectedItems.length === wishItems.length ? "선택 해제" : "전체 선택"}
              </button>
              <button onClick={handleDeleteAll}>전체 삭제</button>
            </div>

            <div className="WishList-order">
                <button>전체 상품 주문</button>
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div className="WishList-pagination">
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

export default WishList;
