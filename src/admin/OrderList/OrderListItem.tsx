import { convertStringToDate } from "../Utilities/DateConverter";
import { orderStatusTypes } from "../Models/Types";
import styles from "./OrderList.module.css";

const statusStyles: Array<string> = [
  styles.col0,
  styles.col1,
  styles.col2,
  styles.col3,
  styles.col4,
  styles.col5,
];
export default function OrderListItem({
  id,
  number,
  index,
  createdAt,
  status,
  onClick,
  isSelected,
}: {
  id: string;
  number: number;
  index: number;
  createdAt: string;
  status: number;
  onClick: (i: number) => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={styles.item + (isSelected ? " active" : "")}
      onClick={() => onClick(index)}
    >
      <div className={styles.itemHeader}>
        <div>
          <p>{number}</p>
        </div>
        <div className="text-right">{convertStringToDate(createdAt)}</div>
      </div>
      <div className={styles.itemStatus+" "+statusStyles[status]}>{orderStatusTypes[status]}</div>
    </div>
  );
}
