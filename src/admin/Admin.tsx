"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { itemTypes, orderStatusTypes, type IOrder } from "./Models/Types";
import ParamTab from "./OrderTabs/ParamTab";
import OrderListItem from "./OrderList/OrderListItem";
import { useNavigate } from "react-router";
import { getLogin } from "../Controllers/LoginController";
import ModalLogin from "./modal.login";
import { convertStringToDate } from "./Utilities/DateConverter";
import ItemsTab from "./OrderTabs/ItemsTab";
import HistoryTab from "./OrderTabs/HistoryTab";
import OrderList from "./OrderList/OrderList";

export default function Admin() {
  const [activeOrderIndex, setActiveOrderIndex] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [markPanelShown, setMarkPanelShown] = useState<boolean>(false);

 const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
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
  
  const setActiveOrderStatus = (status: number) => {
    orders[activeOrderIndex].status = status;
    const url =
      "http://localhost:5030/api/orders/" +
      orders[activeOrderIndex].id +
      "/setStatus";
    const token = localStorage.getItem("access_token");
    axios.post(
      url,
      {
        status: status,
      },
      {
        headers: {
          Authorization: "bearer " + token,
        },
      },
    );
  };
  

  return (
    <div className="main-wrapper">
      <ModalLogin opened={modalOpen} setOpened={setModalOpen} />

      <div className="left">
        <div>
          <div>
            <h1>Zamówienie {orders[activeOrderIndex]?.orderNumber}</h1>
            <p className="text-center">{orders[activeOrderIndex]?.id}</p>
          </div>
          <div className="flex w-full justify-between gap-10 mt-8 mb-8">
            <div className="w-full">
              <div className="param-wrapper-1">
                <span className="param-name-1">Utwożono</span>
                <span className="param-1">
                  {convertStringToDate(orders[activeOrderIndex]?.createdAt)}
                </span>
              </div>
              {/* <div className="param-wrapper-1">
                <span className="param-name-1">Cena konieczna</span>
                <span className="param-1">250,00zł</span>
              </div> */}
              <div className="param-wrapper-1">
                <span className="param-name-1">Stan</span>
                <span className="param-1 status-text-inprogress">
                  W przygotowaniu
                </span>
              </div>
              {/* <div className="param-wrapper-1">
                <span className="param-name-1">Opłąta</span>
                {(activeOrder != null && (
                  <span className="param-1 payment-text-successful">
                    BLIK powiodła się
                  </span>
                )) ||
                  "-"}
              </div> */}
            </div>
          </div>

          {(orders[activeOrderIndex] != null && (
            <ItemsTab title="Artykuły" list={orders[activeOrderIndex]?.items} />
          )) || <div>Nie ma historii</div>}
            {(orders[activeOrderIndex] != null && (
            <HistoryTab title="Historia" list={orders[activeOrderIndex]?.history} />
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
          <div
            className="mark"
            onClick={() => setMarkPanelShown(!markPanelShown)}
          >
            Odznacz jako:
            <div className={"mark-panel " + (markPanelShown ? "" : " hidden")}>
              <button onClick={() => setActiveOrderStatus(1)}>
                In Progress
              </button>
              <button onClick={() => setActiveOrderStatus(2)}>Produced</button>
              <button onClick={() => setActiveOrderStatus(3)}>Packing</button>
              <button onClick={() => setActiveOrderStatus(4)}>
                Ready For Shipping
              </button>
              <button onClick={() => setActiveOrderStatus(5)}>
                In Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="right w-full m-10">
        {" "}
        <div className="w-full h-20 flex justify-between">
          <div></div>
          <div>
            Login: {getLogin()}
            <button onClick={() => setModalOpen(true)}>...</button>
          </div>
        </div>
        <OrderList orders={orders} isLoading={loading} selectOrder={setActiveOrderIndex} selectedOrderIndex={activeOrderIndex}/>
      </div>
    </div>
  );
}
