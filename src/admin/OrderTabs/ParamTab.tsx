import React, { useState } from "react";
import {
  itemTypes,
  type IOrderHistoryElement,
  type IOrderItem,
} from "../Models/Types";

const TABNAMES = ["Artykuły", "Klient", "Dostawa", "Historia"];

export default function ParamTab({title, list}:{title:string, list:Array<IOrderHistoryElement|IOrderItem>}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className="param-wrapper-2">
      <div className="flex items-center gap-4">
        <h3>{title +" (" + list.length})</h3>
        <button onClick={() => setIsOpened(!isOpened)}>V</button>
      </div>
      <ul className={isOpened? "":"hidden"}>
     
      </ul>
    </div>
  );
}
