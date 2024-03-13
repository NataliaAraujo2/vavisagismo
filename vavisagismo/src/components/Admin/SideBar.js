import React from "react";
import styles from "./AdminComponents.module.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.button}>
        <Link to={"/admin/authusers"}>Autorizações</Link>
      </div>
      <div className={styles.button}>
        <Link to={"/admin/users"}>Clientes</Link>
      </div>
    </div>
  );
};

export default SideBar;
