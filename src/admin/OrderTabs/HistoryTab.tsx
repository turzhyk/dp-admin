import React, { useState } from "react";
import {
  itemTypes,
  type IOrderHistoryElement,
  type IOrderItem,
} from "../Models/Types";
import { convertStringToDate } from "../Utilities/DateConverter";

export default function HistoryTab({
  title,
  list,
}: {
  title: string;
  list: Array<IOrderHistoryElement>;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className="param-wrapper-2">
      <div className="flex items-center gap-4">
        <h3>{title + " (" + list.length})</h3>
        <button onClick={() => setIsOpened(!isOpened)}>V</button>
      </div>
      <div className="param-tab-list-wrapper">
      <ul className={"param-tab-list " +(isOpened ? "" : "hidden")}>
        {list.map((i) => {
          return (
            <li key={i.changedAt} className="param-wrapper-2-1">
              <p>{i.status}</p>
              <p>{i.authorId}</p>
              <p>{convertStringToDate( i.changedAt)}</p>
            </li>
          );
        }).reverse()}
      </ul></div>
    </div>
  );
}
