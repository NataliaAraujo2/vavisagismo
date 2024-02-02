import React from "react";
import styles from "./Home.module.css";
import { useAuthValue } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuthValue();
  
  return (
    <div className={styles.home}>
      {!user ? (
        <>
          <div>
            <h1>Seja Bem Vindo!</h1>
          </div>
          <div>
            <p>Faça seu cadastro ou login para acessar a sua página!</p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>Seja Bem Vindo {user.userName}!</h1>
          </div>
          <div>
            <p>Envie novas informações através de nosso formulário ou veja seu histórico!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
