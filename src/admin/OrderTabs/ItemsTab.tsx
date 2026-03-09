import React, { useState } from "react";
import {
  type IOrderItem,
} from "../Models/Types";

export default function ItemsTab({
  title,
  list,
}: {
  title: string;
  list: Array<IOrderItem>;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div className="param-wrapper-2">
      <div className="flex items-center gap-4">
        <h3>{title + " (" + list.length})</h3>
        <button onClick={() => setIsOpened(!isOpened)}>V</button>
      </div>
      <ul className={isOpened ? "" : "hidden"}>
        {list.map((i) => {
          return (
            <li key={crypto.randomUUID()} className="param-wrapper-2-1">
              <p>{}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
