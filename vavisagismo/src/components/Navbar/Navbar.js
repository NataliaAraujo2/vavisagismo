import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../images/logobremoved.png";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      <ul className={styles.link_list}>
        {!user ? (
          <>
            <li>
              <NavLink
                to="/register"
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
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/form"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Formulário
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Histórico
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={logout}
              >
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
