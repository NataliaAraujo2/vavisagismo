import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import SideBar from "../../components/Admin/SideBar";

const Admin = () => {
 

  return (
    <div className={styles.admin}>
      <SideBar />

      <div className={styles.main}></div>
    </div>
  );
};

export default Admin;
