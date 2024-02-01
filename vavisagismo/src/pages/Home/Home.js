import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        <h1>Seja Bem Vindo!</h1>
      </div>
      <div>
        <p>Faça seu cadastro ou login para acessar a sua página!</p>
      </div>
    </div>
  );
};

export default Home;
