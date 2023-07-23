import React from "react";
import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.containerLoader}>

    <div className={styles.spinner}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    </div>
  );
}