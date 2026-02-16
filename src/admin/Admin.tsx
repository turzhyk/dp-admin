"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { itemTypes, orderStatusTypes, type IOrder } from "./Models/Types";
import ParamTab from "./OrderTabs/ParamTab";
import { convertToDate } from "./Utilities/DateConverter";
import OrderListItem from "./OrderListItem";
import { useNavigate } from "react-router";
import { getLogin } from "../Controllers/LoginController";
import ModalLogin from "./modal.login";


export default function Admin() {
  const myId: string = "23";
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState<IOrder | null>(null);

    const [modalOpen, setModalOpen] = useState(false);

  const nav = useNavigate();

  const getOrderList = () => {
    if (loading)
      return (
        <div className="w-60 h-40 border-2 text-center">
          System się urochamia...
        </div>
      );
    else
      return (
        <>
          <div className="order-list">
            <OrderListItem />
            <OrderListItem />
            <OrderListItem />
            <OrderListItem />
          </div>
          <div className="order-lifst">
            <OrderListItem />
            <OrderListItem />
            <OrderListItem />
            <OrderListItem />
          </div>
        </>
      );
  };
  useEffect(() => {
    if (localStorage.getItem("access_token") == null) {
      nav("/login");
    }
    axios
      .get("http://localhost:5030/api/orders")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
        setActiveOrder(res.data[0]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-wrapper">
     <ModalLogin opened={modalOpen} setOpened={setModalOpen} />
      
      <div className="left">
        <div>
          <div>
            <h1>Zamówienie {activeOrder?.id}</h1>
          </div>
          <div className="flex w-full justify-between gap-10 mt-8 mb-8">
            <div className="w-full">
              <div className="param-wrapper-1">
                <span className="param-name-1">Utwożono</span>
                <span className="param-1">16/02/2026 14:30</span>
              </div>
              <div className="param-wrapper-1">
                <span className="param-name-1">Cena konieczna</span>
                <span className="param-1">250,00zł</span>
              </div>
            </div>
            <div className="w-full">
              <div className="param-wrapper-1">
                <span className="param-name-1">Stan</span>
                <span className="param-1 status-text-inprogress">
                  W przygotowaniu
                </span>
              </div>
              <div className="param-wrapper-1">
                <span className="param-name-1">Opłąta</span>
                {(activeOrder != null && (
                  <span className="param-1 payment-text-successful">
                    BLIK powiodła się
                  </span>
                )) ||
                  "-"}
              </div>
            </div>
          </div>

          {(activeOrder != null && (
            <ParamTab type={0} list={activeOrder?.items} />
          )) || <div>Nie ma historii</div>}
          {/* <div className="param-wrapper-2">
            <h3>Historia ({orders[0].history.length})</h3>
            <ul>
              {orders[0].history.map((i) => {
                return (
                  <li className="param-wrapper-2-1 flex justify-between">
                    <p>
                      {
                        orderStatusTypes[
                          i.status as keyof typeof orderStatusTypes
                        ]
                      }
                    </p>
                    <p className="uppercase">operator:{" " + i.authorId}</p>
                    <p className="font-bold">{convertToDate(i.changedAt)}</p>
                  </li>
                );
              })}
            </ul>
          </div> */}
        </div>
        <div className="container-buttons">
          <button className="abort">Zrezygnuj</button>
          <button className="mark">Odznacz jako:</button>
        </div>
      </div>
      <div className="right w-full m-10">
        {" "}
        <div className="w-full h-20 flex justify-between">
          <div></div>
          <div>Login: {getLogin()}<button onClick={()=>setModalOpen(true)}>...</button></div>
        </div>
        <div className="flex justify-between w-100 gap-0 m-20">
          {getOrderList()}
        </div>
      </div>
    </div>
  );
}
