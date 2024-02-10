import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const Lifestyle = () => {
  const [smoke, setSmoke] = useState("");
  const [smokeType, setSmokeType] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [alcoholfrequency, setAlcoholFrequency] =useState("")
  const [physicalExercise, setPhysicalExercise] = useState("");
  const [tattoos, setTattoos] = useState("");

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("lifestyle");

  const options = ["Sim", "Não"];

  const smokeChoice = (e) => {
    e.preventDefault();
    setSmoke(e.target.value);
  };

  const alcoholChoice = (e) => {
    e.preventDefault();
    setAlcohol(e.target.value);
  };

  const tattoosChoice = (e) => {
    e.preventDefault();
    setTattoos(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("")

    insertDocument({
      uid: user.uid,
      smoke,
      smokeType,
      alcohol,
      alcoholfrequency,
      physicalExercise,
      tattoos,
    });

    setSuccess(true);
    setSmoke("");
    setAlcohol("");
    setPhysicalExercise("");
    setTattoos("");
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Me fale sobre o seu estilo de vida!</h2>
        <label>
          <span>Você Fuma (cigarro eletrônico, cigarro normal ou narguile)?</span>
          {options.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                id="smoke"
                value={option}
                checked={smoke === option}
                onChange={smokeChoice}
              />
              {option}
            </label>
          ))}
        </label>
        <label>
          <span>Se sim, Qual?</span>
          <input
            type="text"
            name="smoketype"
            placeholder="Cigarro Normal, Narguile, Cigarro Eletrônico"
            value={smokeType}
            onChange={(e) => setSmokeType(e.target.value)}
          />
        </label>

       
        <label>
          <span>Você consome bebidas alcoólicas?</span>
          {options.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                id="alcohol"
                value={option}
                checked={alcohol === option}
                onChange={alcoholChoice}
              />
                     {option}
            </label>
          ))}
        </label>
        <label>
          <span>Se sim, com qual frequência?</span>
          <input
            type="text"
            name="alcoholfrequency"
            placeholder=""
            value={alcoholfrequency}
            onChange={(e) => setAlcoholFrequency(e.target.value)}
          />
        </label>
        <label>
          <span>Você possui tatuagens?</span>
          {options.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                id="tatoo"
                value={option}
                checked={tattoos === option}
                onChange={tattoosChoice}
              />
                     {option}
            </label>
          ))}
        </label>
       
        <label>
          <span>Voce faz atividades físicas?</span>
          <textarea
            name="physicalexercise"
            placeholder="Descreva sua rotina de exercícios físicos"
            value={physicalExercise}
            onChange={(e) => setPhysicalExercise(e.target.value)}
          />
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

export default Lifestyle;
