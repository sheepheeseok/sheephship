import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const DeliveryAddressManagement = ({ setSelectedTab, setEditingAddressId }) => {
  const navigate = useNavigate();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllSelected, setIsAllSelected] = useState(false);


  // 배송지 목록 불러오기 (컴포넌트 마운트 시 또는 데이터 변경 시 다시 불러오기)
  const fetchDeliveryAddresses = async () => {
    setLoading(true);
    try {
      const loginId = getCookie("loginId"); // 쿠키에서 로그인 ID 추출
      if (!loginId) {
        alert("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      const res = await axios.get(`/api/MemberDeliveryInfo/${loginId}`);
      console.log("서버에서 받은 응답:", res.data);
      const deliveryData = res.data;

      // 응답이 배열이 아닌 단일 객체라면 배열로 감쌈
      const deliveryList = Array.isArray(deliveryData) ? deliveryData : [deliveryData];

      // 서버에서 내려주는 필드명에 따라 수정 필요
      setDeliveryAddresses(deliveryList);
    } catch (e) {
      alert("배송지 목록을 불러오지 못했습니다.");
      console.error("Error fetching delivery addresses:", e);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchDeliveryAddresses();
  }, []); // [] : 컴포넌트가 마운트될 때 한 번만 실행

  const handleCheckboxChange = (id) => {
    setSelectedAddresses((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((addressId) => addressId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    // 헤더 체크박스 상태는 업데이트하지 않음
  };


  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setIsAllSelected(checked); // 상태 직접 관리
    if (checked) {
      setSelectedAddresses(deliveryAddresses.map((_, index) => index));
    } else {
      setSelectedAddresses([]);
    }
  };

  const handleEditClick = (id) => {
    console.log("수정 버튼 클릭 - 주소 ID:", id);
    setEditingAddressId(id);
    setSelectedTab("DeliveryAddressForm");
  };

  const handleDeleteSelected = async () => {
    if (selectedAddresses.length === 0) {
      alert("삭제할 배송지를 선택해주세요.");
      return;
    }

    if (window.confirm("선택된 배송지를 삭제하시겠습니까?")) {
      try {
        // 실제 API 호출로 대체 필요
        // await axios.post("/api/deleteDeliveryAddresses", { ids: selectedAddresses });
        setDeliveryAddresses((prevAddresses) =>
          prevAddresses.filter((address) => !selectedAddresses.includes(address.id))
        );
        setSelectedAddresses([]);
        alert("선택된 배송지가 삭제되었습니다.");
      } catch (e) {
        alert("배송지 삭제에 실패했습니다.");
        console.error("Error deleting addresses:", e);
      }
    }
  };

  const handleEditAddress = (addressId) => {
    navigate(`/delivery-address/form/${addressId}`); // ID 전달
  };

  const handleRegisterNewAddress = () => {
    navigate("/delivery-address/form");
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="DAM-delivery-address-container">
      <h1 className="DAM-delivery-address-list-title">배송 주소록 관리</h1>
      <div className="DAM-section-bar" />

      <table className="DAM-address-table">
        <thead>
          <tr className="DAM-table-header">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={isAllSelected}
              />
            </th>
            <th>수령인</th>
            <th>휴대전화</th>
            <th>주소</th>
            <th></th> {/* 수정 버튼을 위한 빈 헤더 */}
          </tr>
        </thead>
        <tbody>
          {deliveryAddresses.length > 0 ? (
            deliveryAddresses.map((address, index) => (
              <tr key={index} className="DAM-table-row">
                <td className="DAM-table-cell">
                  <input
                    type="checkbox"
                    checked={selectedAddresses.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="DAM-table-cell">{address.name}</td>
                <td className="DAM-table-cell">{address.phoneNumber}</td>
                <td className="DAM-table-cell">
                  {address.firstAddress} {address.secondAddress}
                </td>
                <td className="DAM-table-cell">
                  <button
                    type="button"
                    className="DAM-table-action-button"
                    onClick={() => handleEditClick(address)
                    }

                  >
                    수정
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="DAM-table-row">
              <td colSpan="6" className="DAM-table-cell" style={{ textAlign: "center", padding: "40px" }}>
                등록된 배송 주소록이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="DAM-bottom-action-buttons">
        <button type="button" className="DAM-delete-selected-btn" onClick={handleDeleteSelected}>
          선택 주소록 삭제
        </button>
        <button type="button" className="DAM-register-address-btn" onClick={() => setSelectedTab("DeliveryAddressForm")}>
          배송지 등록
        </button>
      </div>

      <div className="DAM-notice-section">
        <h2>배송 주소록 유의사항</h2>
        <div className="DAM-notice-bar" />
        <p className="DAM-notice-text">
          • 배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.<br/>
          • 자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.<br/>
          • 기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.
        </p>
      </div>
    </div>
  );
};

export default DeliveryAddressManagement;