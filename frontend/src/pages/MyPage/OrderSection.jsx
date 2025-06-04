import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import Savings from "./Savings";
import OrderDetail from "./OrderDetail";

const mockOrder = {
  date: "25.03.26",
  image: "https://sheephship.com/web/upload/NNEditor/20240307/0075_BLACK.png",
  name: "Stealth XPAC™ Deluxe Chalk Bucket · Mag Closure",
  option: "컬러: 검정",
  quantity: 1,
  price: 48500,
  point: 428,
  expire: "26.03.26",
  id: 1,
  type: "적립", // "적립", "사용", "미가용"
};

const myProducts = [mockOrder];
const mockOrders = myProducts.map((product, i) => ({
  ...product,
  id: i + 1,
  point: 428 + i * 100
}));

const OrderSection = ({ selectedTab, setSelectedTab, selectedOrder, setSelectedOrder }) => {
  const [orders, setOrders] = useState(mockOrders);

  return (
    <>
      {selectedTab === "OrderHistory" && (
        <OrderHistory
          orders={orders}
          setOrders={setOrders}
          setSelectedTab={setSelectedTab}
          setSelectedOrder={setSelectedOrder}
        />
      )}
      {selectedTab === "OrderDetail" && selectedOrder && (
        <OrderDetail
          order={selectedOrder}
        />
      )}
      {selectedTab === "Savings" && (
        <Savings
          orders={orders}
        />
      )}
    </>
  );
};

export default OrderSection;