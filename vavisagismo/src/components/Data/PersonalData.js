import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import ProfilePicture from "./ProfilePicture";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const PersonalData = () => {
  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //form const
  const [birthDate, setBirthDate] = useState("");
  const [occupation, setOccupation] = useState("");
  const [civilStatus, setCivilStatus] = useState("");

  //Ref focus
  const birthDateRef = useRef(null);
  const occupationRef = useRef(null);
  const civilStatusRef = useRef(null);

  //error and success const
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  //Civil Status const
  const options = [
    "Solteiro",
    "Casado",
    "Divorciado",
    "Separado",
    "Em União Estável",
    "Viúvo",
  ];

  const handleChange = (e) => {
    setCivilStatus(e.target.value);
  };

  const { user } = useAuthValue();
  const { documents: personalData } = useFetchDocuments(
    "personaldata",
    user.uid
  );
  const { updateDocument } = useUpdateDocument("personaldata");
  const userName = user.displayName;

  const { insertDocument, response } = useInsertDocument("personaldata");

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      const field = "uid";
      const demand = user.uid;
      await filterConclusion(field, demand);
    }

    loadData();

    if (filteredConclusion) {
      setNoRender(true);
    }

    return () => {
      setCancelled(true);
    };
  }, [cancelled, filterConclusion, filteredConclusion, user.uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (!birthDate) {
      setFormError("A data de nascimento é obrigatória!");
      birthDateRef.current.focus();
      return;
    }
    if (!occupation) {
      setFormError("A profissão é obrigatória!");
      occupationRef.current.focus();
      return;
    }
    if (!civilStatus) {
      setFormError("O estado civil é obrigatório!");
      civilStatusRef.current.focus();
      return;
    }

    const data = {
      userName: user.displayName,
      birthDate,
      occupation,
      civilStatus,
    };

    if (personalData) {
      for (var i = 0; i < personalData.length; i++) {
        if (personalData[i].uid === user.uid) {
          updateDocument(personalData[i].id, data);
        }
      }
    }

    if (personalData.length === 0) {
      insertDocument({
        userName: user.displayName,
        birthDate,
        occupation,
        civilStatus,
        uid: user.uid,
      });
    }

    setSuccess(true);
    setBirthDate("");
    setOccupation("");
    setCivilStatus("");
  };

  return (
    <div className={styles.personaldata}>
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <>
          <div className={styles.responsiveness}>
            <div className={styles.responsivenessMarginTop}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2>{userName}, vamos começar?</h2>
              <label>
                <span>Data de Nascimento:</span>
                <input
                  type="date"
                  name="birthdate"
                  placeholder="Dia, Mês e Ano de Nascimento"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  ref={birthDateRef}
                />
              </label>
              <label>
                <span>Profissão</span>
                <input
                  type="text"
                  name="occupation"
                  placeholder="Profissão"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  ref={occupationRef}
                />
              </label>
              <label>
                <span>Estado Civil:</span>
                {options.map((option) => (
                  <label key={option} className={styles.radio}>
                    <input
                      type="radio"
                      name="civilStatus"
                      value={option}
                      checked={civilStatus === option}
                      onChange={handleChange}
                      ref={civilStatusRef}
                    />
                    {option}
                  </label>
                ))}
              </label>

              {!response.loading && <button>Enviar</button>}
              {response.loading && <button disabled>Aguarde...</button>}
              {response.error && <p className="error">{response.error}</p>}
              {formError && <p className="error">{formError}</p>}
              {success && (
                <p className="success">Respostas enviadas com sucesso!</p>
              )}
            </form>
            </div>

            <div>
              <ProfilePicture />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalData;
