import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const goInstagram = () => {
    window.open("https://www.instagram.com/visagista_albuquerque/", "_blank");
  };
  const whatsapp = process.env.REACT_APP_WHATSAPP;
  const goWhatsApp = () => {
    window.open("https://wa.me/5511987587322", "blank");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <div>
          <Link onClick={goInstagram}>
            <FaInstagram />
          </Link>
        </div>
        <div>
          <Link onClick={goWhatsApp}>
            <FaWhatsapp />
          </Link>
        </div>
      </div>

      <div>
        <p>VMAVisagismo &copy;2024</p>
      </div>
    </footer>
  );
};

export default Footer;
