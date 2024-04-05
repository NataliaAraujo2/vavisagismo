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
      if(user.photoURL) {
        setUserPhoto(user.photoURL);
      } else {
        setUserPhoto("https://firebasestorage.googleapis.com/v0/b/vmavisagismo.appspot.com/o/logobremoved.png?alt=media&token=e259ce3f-06bd-4e9a-9429-3e1a85a3eb99")
      }
 
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
