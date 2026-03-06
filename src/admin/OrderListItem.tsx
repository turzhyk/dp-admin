import React from "react";
import { convertStringToDate } from "./Utilities/DateConverter";

export default function OrderListItem({
  id,
  number,
  index,
  createdAt,
  status,
  onClick,
  isSelected
}: {
  id: string;
  number: number;
  index: number;
  createdAt: string;
  status: string;
  onClick: (i: number) => void;
  isSelected:boolean
}) {

  return (
    <div className={"item "+(isSelected?"active":"")} onClick={() => onClick(index)}>
      <div className="flex justify-between font-bold flex-1 ">
        <div>
          <p>{number}</p>
        </div>
        <div className="text-right mr-5">{convertStringToDate(createdAt)}</div>
      </div>
      <div className="status inprogress">Nowe</div>
    </div>
  );
}
