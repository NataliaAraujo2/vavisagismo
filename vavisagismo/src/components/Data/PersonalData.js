import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const PersonalData = () => {
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [occupation, setOccupation] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const options = [
    "Solteiro",
    "Casado",
    "Divorciado",
    "Separado",
    "Em União Estável",
  ];
  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("personaldata");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!nickname) {
      setFormError("O apelido é obrigatório!");
      return;
    }
    if (!birthDate) {
      setFormError("A data de nascimento é obrigatória!");
      return;
    }
    if (!occupation) {
      setFormError("A profissão é obrigatória!");
      return;
    }
    if (!civilStatus) {
      setFormError("O estado civil é obrigatório!");
      return;
    }

    insertDocument({
      nickname,
      birthDate,
      occupation,
      civilStatus,
      uid: user.uid,
    });

    console.log("Sucesso");
    setSuccess(true);
    setNickname("");
    setBirthDate("");
    setOccupation("");
    setCivilStatus("");
  };

  const handleChange = (e) => {
    setCivilStatus(e.target.value);
  };

  return (
    <div className={styles.personaldata}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Apelido:</span>
          <input
            type="text"
            name="nickname"
            placeholder="Qual o seu apelido?"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label>
          <span>Data de Nascimento:</span>
          <input
            type="date"
            name="birthdate"
            placeholder="Dia, Mês e Ano de Nascimento"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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
          />
        </label>
        <label>
          <span>Estado Civil:</span>
          {options.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                value={option}
                checked={civilStatus === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </label>

        {!response.loading && <button>Enviar</button>}
        {response.loading && <button disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        {success && <p className="success">Respostas enviadas com sucesso!</p>}
      </form>
    </div>
  );
};

export default PersonalData;
