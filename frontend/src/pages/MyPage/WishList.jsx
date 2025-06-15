import { useState, useEffect } from "react";
import WishHook from "../../hooks/WishHook.js";

const WishList = () => {
  const {
    wishItems,
    deleteWish,
    deleteAllWish,
    loading,
    error,
  } = WishHook();

  useEffect(() => {
    console.log("🧾 서버에서 받아온 wish 목록:", wishItems);
  }, [wishItems]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 5;

  const handleSelect = (id) => {
    setSelectedItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
        selectedItems.length === wishItems.length ? [] : wishItems.map(item => item.itemId)
    );
  };

  const handleDeleteAll = async () => {
    await deleteAllWish();
    setSelectedItems([]);
  };

  const handleDeleteOne = async (id) => {
    await deleteWish(id);
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
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
        <div className="WishList-Line"/>
        <div className="WishList-Area">
          {loading ? (
              <p>불러오는 중...</p>
          ) : wishItems.length === 0 ? (
              <>
                <img src="/icons/mypage-noneIcon.svg" alt="noneIcon" className="WishList-NoneIcon"/>
                <h1>관심 상품 내역이 없습니다.</h1>
              </>
          ) : (
              <>
                <div className="WishList-Items">
                  {currentItems.map(item => (
                      <div key={item.itemId} className="WishList-Item">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.itemId)}
                            onChange={() => handleSelect(item.itemId)}
                        />
                        <img src={item.mainUrl} alt={item.itemName} className="wishlist-item-img"/>
                        <div className="WishList-Item-Info">
                          <p>{item.itemName}</p>
                          <p>{item.price}원</p>
                        </div>
                        <button onClick={() => handleDeleteOne(item.itemId)}>삭제</button>
                      </div>
                  ))}
                </div>
                <div className="WishList-Actions">
                  <button onClick={handleSelectAll}>
                    {selectedItems.length === wishItems.length ? "선택 해제" : "전체 선택"}
                  </button>
                  <button onClick={handleDeleteAll}>전체 삭제</button>
                </div>
              </>
          )}
        </div>
      </>
  );
};

export default WishList;
