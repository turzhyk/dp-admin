import React from "react";
import styles from "./Home.module.css";
const dayOfWeekName = ["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "Sob"];
export default function Home() {
  const date = new Date();
  const dateString =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  const dayOfWeek = date.getDay();
  const time = date.getHours() + ":" + date.getMinutes();
  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.date}>
          {" "}
          <h1>{time}</h1>
          <h2>{dateString}</h2>
          <h2>({dayOfWeekName[dayOfWeek] || 0})</h2>
        </div>
      </header>
      <div className={styles.sectionsHolder}>
        <a className={styles.sectionBtn}>Sterowanie zamówieniami</a>
      </div>
    </div>
  );
}
