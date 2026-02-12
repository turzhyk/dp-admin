import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const fetchServiceOrders = async () => {
  const q = query(
    collection(db, "ServiceOrders"),
    orderBy("createdAt", "desc") // новые сверху
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const addServiceOrder = async () => {
  try {
    const orderRef = await addDoc(collection(db, "ServiceOrders"), {
      title: "Новый заказ",
      status: "new",
      createdAt: serverTimestamp(),
    });

    // 2️⃣ пишем историю в subcollection
    await addDoc(collection(db, "ServiceOrders", orderRef.id, "history"), {
      type: "created",
      at: serverTimestamp(),
      by: "",
    });
  } catch (error) {
    console.error("Ошибка при добавлении документа:", error);
  }
};
export const takeOrder = async (orderId: string, userId: string) => {
  try {
    const orderRef = doc(db, "ServiceOrders", orderId);

    await updateDoc(orderRef, {
      assignedPersonId: userId,
      status: "in progress",
    });
    await addDoc(collection(db, "ServiceOrders", orderId, "history"), {
      type: "task taken",
      at: serverTimestamp(),
      by: userId,
    });
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  }
};
export interface IHistoryElement {
  title: string;
  date: string;
  author: string;
}
export const getHistory = async (
  orderId: string
): Promise<IHistoryElement[]> => {
  const q = query(
    collection(db, "ServiceOrders", orderId, "history"),
    orderBy("at", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.type, // или data.title
      author: data.by,
      date: data.at instanceof Timestamp
        ? data.at.toDate().toISOString()
        : "",
    };
  });
};