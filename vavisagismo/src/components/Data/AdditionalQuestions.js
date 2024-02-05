import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const AdditionalQuestions = () => {
  const [sunExposure, setSunExposure] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const optionsSunExposure = ["Vermelha", "Rosada", "Dourada"];

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("additionalquestions");

  const handleChange = (e) => {
    setSunExposure(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sunExposure) {
      setFormError("Todas as respostas são obrigatórias");
      return;
    }

    insertDocument({
      sunExposure,
      uid: user.uid,
    });

    setSuccess(true);
    setSunExposure("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Quando exposto ao sol como sua pele fica?</span>
          {optionsSunExposure.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                value={option}
                checked={sunExposure === option}
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

export default AdditionalQuestions;
