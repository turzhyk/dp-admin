import type { IOrder } from "../Models/Types";
import OrderListItem from "./OrderListItem";
import styles from "./OrderList.module.css";
export default function OrderList({
  orders,
  isLoading,
  selectOrder,
  selectedOrderIndex,
}: {
  orders: IOrder[];
  isLoading: boolean;
  selectOrder: (index:number)=>void;
  selectedOrderIndex:number;
}) {
  if (isLoading)
    return (
      <div className="w-60 h-40 border-2 text-center">
        System się urochamia...
      </div>
    );
  else
    return (
        <div className={styles.orderList}>
          {orders.map((i, index) => {
            return (
              <OrderListItem
                key={i.id}
                id={i.id}
                index={index}
                number={i.orderNumber}
                createdAt={i.createdAt}
                onClick={() => selectOrder(index)}
                status={i.status}
                isSelected={selectedOrderIndex == index}
              />
            );
          })}
        </div>
    );
}
