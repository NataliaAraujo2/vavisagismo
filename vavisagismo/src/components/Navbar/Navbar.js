import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../images/logobremoved.png";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(false);
  const [id, setId] = useState("");
  const [uid, setUid] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/vmavisagismo.appspot.com/o/logobremoved.png?alt=media&token=e259ce3f-06bd-4e9a-9429-3e1a85a3eb99");

  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const { filter, document } = useQueries("users");

  const navigate = useNavigate();


  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      
      setAuthUser(false);

      if (user) {
        setUid(user.uid);
      }

      try {
        const field = "uid";
        const demand = uid;
        await filter(field, demand);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        await querySnapshot.forEach((doc) => {
          setId(doc.id);

          if(user.photoURL) {
            setPhotoUrl(user.photoURL);
          } else {
            setPhotoUrl("https://firebasestorage.googleapis.com/v0/b/vmavisagismo.appspot.com/o/logobremoved.png?alt=media&token=e259ce3f-06bd-4e9a-9429-3e1a85a3eb99")
          }
         
          
        });
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }

    loadData();
 
  
    return () => setCancelled(true);
  }, [document, filter, user, navigate, uid, cancelled, authUser]);

 


  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      

      <ul className={styles.link_list}>
       
          <>
            {user ? (
              <>
                <div className={styles.responsiveness}>
                  <div className={styles.link_list}>
                    <li>
                      <NavLink
                        to={`/system/form`}
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        Formulário
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/system/history/${id}`}
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        Histórico
                      </NavLink>
                    </li>
                  
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                        onClick={logout}
                      >
                        Sair
                      </NavLink>
                    </li>
                  </div>
                  <div>
                    <li>
                      <img
                        src={photoUrl}
                        alt="Imagem"
                        className={styles.avatar}
                      />
                    </li>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Sobre mim
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Cadastro
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Entrar
                  </NavLink>
                </li>
              </>
            )}
          </>
      
      </ul>
    </nav>
  );
};

export default Navbar;
