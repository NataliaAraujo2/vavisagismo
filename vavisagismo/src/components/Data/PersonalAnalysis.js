import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const PersonalAnalysis = () => {
  const [bodyAvaliation, setBodyAvaliation] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("personaldata");

  const questions = [
    "Como voce avalia o seu corpo desnudo?",
    "Como voce avalia o seu corpo vestido formalmente?",
    "Como voce avalia o seu corpo vestido informalmente?",
    
  ];

  const options = [];
  for (let i = 0; i < 11; i++) {
    options.push(i);
  }

  const bodyAvaliationChoice = (e) => {
    e.preventDefault();
    setBodyAvaliation(e.target.value);
  };

  return (
    <div>
      <form action="" className={styles.form}>
        <h2>Para todas as perguntas de uma nota de 0 a 10 e comente!</h2>
        {questions.map((question) => (
        <label>
         {question}
            <input />
      
         
        </label>
            ))}
        {!response.loading && <button>Enviar</button>}
        {response.loading && <button disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        {success && <p className="success">Respostas enviadas com sucesso!</p>}
      </form>
    </div>
  );
};

export default PersonalAnalysis;
