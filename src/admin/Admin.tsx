"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { type IOrder } from "./Models/Types";

import { useNavigate } from "react-router";
import { getLogin } from "../Controllers/LoginController";

import OrderList from "./OrderList/OrderList";
import OrderEditPanel from "./OrderEditPanel/OrderEditPanel";
import ModalLogin from "./Login/Login.Modal";

export default function Admin() {
  const [activeOrderIndex, setActiveOrderIndex] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState(false);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const handleOrderStatusChange = (orderIndex: number, status: number) => {
    setOrders((prev) =>
      prev.map((item, index) =>
        index === orderIndex ? { ...item, status: status } : item,
      ),
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token == null) {
      nav("/login");
    }
    axios
      .get("http://localhost:5030/api/orders/get", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
        setActiveOrderIndex(0);
        setLoading(false);
      })
      .catch((err: any) => console.error(err.status));
  }, []);

  return (
    <div className="main-wrapper">
      <ModalLogin opened={modalOpen} setOpened={setModalOpen} />
      {orders != null && (
        <OrderEditPanel
          activeOrder={orders[activeOrderIndex]}
          onStatusChange={(status) =>
            handleOrderStatusChange(activeOrderIndex, status)
          }
        />
      )}

      <div className="right w-full m-10">
        {" "}
        <div className="w-full h-20 flex justify-between">
          <div></div>
          <div>
            Login: {getLogin()}
            <button onClick={() => setModalOpen(true)}>...</button>
          </div>
        </div>
        <OrderList
          orders={orders}
          isLoading={loading}
          selectOrder={setActiveOrderIndex}
          selectedOrderIndex={activeOrderIndex}
        />
      </div>
    </div>
  );
}
