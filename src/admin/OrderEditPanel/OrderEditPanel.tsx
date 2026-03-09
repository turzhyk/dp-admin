import React, { useState } from "react";
import { convertStringToDate } from "../Utilities/DateConverter";
import type { IOrder } from "../Models/Types";
import ItemsTab from "../OrderTabs/ItemsTab";
import HistoryTab from "../OrderTabs/HistoryTab";
import styles from "./OrderEditPanel.module.css";
import axios from "axios";

export default function OrderEditPanel({
  activeOrder,
  onStatusChange
}: {
  activeOrder: IOrder;
  onStatusChange: (status:number)=>void;
}) {
  const [markPanelShown, setMarkPanelShown] = useState<boolean>(false);
  const setActiveOrderStatus = (status: number) => {
    onStatusChange(status);
    const url =
      "http://localhost:5030/api/orders/" + activeOrder.id + "/setStatus";
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
  <div className={styles.orderPanel}>
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Zamówienie {activeOrder?.orderNumber}
        </h1>
        <p className={styles.orderId}>{activeOrder?.id}</p>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaColumn}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Utwożono</span>
            <span className={styles.metaValue}>
              {convertStringToDate(activeOrder?.createdAt)}
            </span>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Stan</span>
            <span
              className={`${styles.metaValue} ${styles.statusInProgress}`}
            >
              W przygotowaniu
            </span>
          </div>
        </div>
      </div>

      {(activeOrder && (
        <ItemsTab title="Artykuły" list={activeOrder?.items} />
      )) || <div>Nie ma historii</div>}

      {(activeOrder && (
        <HistoryTab title="Historia" list={activeOrder?.history} />
      )) || <div>Nie ma historii</div>}
    </div>

    <div className={styles.actions}>
      <button className={`${styles.button} ${styles.abortButton}`}>
        Zrezygnuj
      </button>

      <div
        className={`${styles.button} ${styles.statusButton}`}
        onClick={() => setMarkPanelShown(!markPanelShown)}
      >
        Odznacz jako:

        <div
          className={`${styles.statusMenu} ${
            !markPanelShown ? styles.statusMenuHidden : ""
          }`}
        >
          <button onClick={() => setActiveOrderStatus(1)}>In Progress</button>
          <button onClick={() => setActiveOrderStatus(2)}>Produced</button>
          <button onClick={() => setActiveOrderStatus(3)}>Packing</button>
          <button onClick={() => setActiveOrderStatus(4)}>
            Ready For Shipping
          </button>
          <button onClick={() => setActiveOrderStatus(5)}>In Delivery</button>
        </div>
      </div>
    </div>
  </div>
);
}
