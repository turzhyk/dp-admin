import React, { useEffect, useState } from "react";
import styles from "./OrderCreate.module.css";
import axios from "axios";

interface ProductsResponse {
  products: Record<string, string>;
}
export default function OrderCreate() {
  const [products, setProducts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(" https://api.turzan.pl/products", {}).then((res) => {
      setProducts(res.data.products);
      setIsLoading(false);
    });
  }, []);
  return (
    <section className={styles.orderCreatePanel}>
      <h2>Create New Order</h2>
      <div className={styles.content}>
        {Object.values(products).map((name) => (
          <div className={styles.orderTypeItem} key={name}>{name}</div>
        ))} 
      </div>
    </section>
  );
}
