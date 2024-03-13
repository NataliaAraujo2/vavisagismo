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
  const [dateNow, setDateNow] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/vanessaalbuquerquevisagismo.appspot.com/o/images%2Flogo.png?alt=media&token=aa8651c0-fb6b-442e-a218-366ba5f5bb21");
  const [keepState, setKeepState] = useState(false);

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

          setPhotoUrl(user.photoURL);
        });
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }

    loadData();

    if (document.authUser === "admin") {
      setAuthUser(true);
    }

    return () => setCancelled(true);
  }, [document, filter, user, navigate, uid, cancelled, authUser]);

  const date = () => {
    const now = new Date();

    const dayName = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];

    const monName = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "agosto",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const agora = ` ${dayName[now.getDay()]}, ${now.getDate()} de ${
      monName[now.getMonth()]
    } de ${now.getFullYear()}`;

    setDateNow(agora);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    date();
    setKeepState(true);
    navigate("/admin");
  };

  const returnSystem = (e) => {
    e.preventDefault();
    setKeepState(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Logo" />
      </NavLink>
      
      {user && !document.authUser && <p>Carregando...</p>}
      <ul className={styles.link_list}>
        {!keepState ? (
          <>
            {document ? (
              <>
                <div className={styles.responsiveness}>
                  <div className={styles.link_list}>
                    <li>
                      <NavLink
                        to={`/system/form/${id}`}
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
                    <>
                      {authUser && (
                        <li>
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                            onClick={handleSubmit}
                          >
                            Admin
                          </NavLink>
                        </li>
                      )}
                    </>
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
        ) : (
          <>
            <div className={styles.dateNow}>
              <li>{dateNow}</li>
              <li>
                <button onClick={returnSystem}>Sair</button>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
