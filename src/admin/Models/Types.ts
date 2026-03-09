export interface IOrder {
  id: string;
  orderNumber:number
  desc: string;
  price: number;
  assignedTo: string;
  status: number;
  createdAt: string;
  items: Array<IOrderItem>;
  history: Array<IOrderHistoryElement>;
}
export interface IOrderItem {
  id:string;
  type: string;
  quantity: number;
  pricePerUnit: number;
  options: string;
}
export interface IOrderHistoryElement {
  id: string;
  status: string;
  authorId: string;
  changedAt: string;
}
export const itemTypes = {
  0: "businesscard",
  1: "banner",
  3: "article",
} as const;
export const orderStatusTypes:Record<number,string> = {
  0: "Utwożony",
  1: "W przygotowaniu",
  2: "Przygotowane",
  3: "Packing",
  4: "Ready for shipping",
  5: "In delivery",
  6:"Done"
} as const;