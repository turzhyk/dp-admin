import React, { useState } from "react";
import {
  itemTypes,
  type IOrderHistoryElement,
  type IOrderItem,
} from "../Models/Types";

const TABNAMES = ["Artykuły", "Klient", "Dostawa", "Historia"];

export default function ParamTab(
  props:
    | { type: number; list: Array<IOrderItem> }
    | { type: number; list: Array<IOrderHistoryElement> },
) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <div className="param-wrapper-2">
      <div className="flex items-center gap-4">
        <h3>{TABNAMES[props.type] + " (" + props.list.length})</h3>
        <button onClick={() => setIsOpened(!isOpened)}>V</button>
      </div>
      <ul className={isOpened? "":"hidden"}>
        {props.list.map((i) => {
          return (
            <li className="param-wrapper-2-1">
              <p>{itemTypes[props.type as keyof typeof itemTypes]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
