import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../logo.png";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      <ul className={styles.link_list}>
        <li>
          <NavLink
            to="/cadastro"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Cadastro
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
