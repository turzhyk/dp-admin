export interface IOrder {
  id: string;
  desc: string;
  price: number;
  assignedTo: string;
  status: number;
  createdAt: string;
  items: Array<IOrderItem>;
  history: Array<IOrderHistoryElement>;
}
export interface IOrderItem {
  type: string;
  quantity: number;
  pricePerUnit: number;
  options: string;
}
export interface IOrderHistoryElement {
  status: string;
  authorId: string;
  changedAt: string;
}
export const itemTypes = {
  0: "businesscard",
  1: "banner",
  3: "article",
} as const;
export const orderStatusTypes = {
  New: "Utwożony",
  1: "Potrzebna informacja",
  2: "W przygotowaniu",
  3: "Czeka na wysyłkę",
  4: "W drodze",
  5: "Dostarczono",
} as const;