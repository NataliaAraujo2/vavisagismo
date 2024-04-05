import React, { useEffect, useState } from "react";
import styles from "./HomeSystem.module.css";
import { useAuthValue } from "../../../context/AuthContext";

const HomeSystem = () => {
  const [userName, setUserName] = useState("");
  const [ setUserPhoto] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const { user } = useAuthValue();

  useEffect(() => {
    if (cancelled) return;

    if (user) {
      setUserName(user.displayName);
 
    }

    return () => {
      setCancelled(true);
    };
  }, [user, cancelled, setUserPhoto]);

  return (
    <>
      {user && (
        <div className={styles.homeUser}>
          <h1>Seja Bem Vindo {userName}!</h1>
          <p>
            Envie novas informações através de nosso formulário ou veja seu
            histórico!
          </p>
        </div>
      )}
    </>
  );
};

export default HomeSystem;
