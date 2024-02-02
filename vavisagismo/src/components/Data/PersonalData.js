import React, { useState } from "react";
import styles from "./Data.module.css";


const PersonalData = () => {
  const [displayName, setDisplayName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [occupation, setOccupation] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  
  const options = [
    "Solteiro",
    "Casado",
    "Divorciado",
    "Separado",
    "Em Uniião Estável",
  ];

  const handleSubmit =(e) => {
    e.prevent.Default()
}

  const handleChange = (e) => {
    setCivilStatus(e.target.value);
  };
  return (
    <div className={styles.personaldata}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Qual o seu apelido?"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Apelido:</span>
          <input
            type="text"
            name="nickname"
            required
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
            required
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
            required
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
        <button>Enviar</button>
    {/*
     {!loading && <button>Enviar</button>}
        {loading && <button disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
    */}   
      </form>
    </div>
  );
};

export default PersonalData;
