import React, { useEffect, useState } from "react";
import styles from "./HomeSystem.module.css";
import { useAuthValue } from "../../../context/AuthContext";

const HomeSystem = () => {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const { user } = useAuthValue();

  useEffect(() => {
    if (cancelled) return;

    

    if (user) {
      setUserName(user.displayName);
      setUserPhoto(user.photoURL);
    }

    return () => {
      setCancelled(true);
    };
  }, [user, cancelled]);

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
