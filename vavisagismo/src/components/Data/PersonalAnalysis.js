import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const PersonalAnalysis = () => {
  const [nakedBody, setNakedBody] = useState("");
  const [formallyDressed, setFormallyDressed] = useState("");
  const [informallyDressed, setInformallyDressed] = useState("");
  const [sunExposedSkin, setSunExposedSkin] = useState("");
  const [faceMakeup, setFaceMakeup] = useState("");
  const [cleanFace, setCleanFace] = useState("");

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("personalanalysis");

  const optionSunExposedSkin = ["Vermelha", "Rosada", "Dourada"];

  const sunExposedSkinChoice = (e) => {
    e.preventDefault();
    setSunExposedSkin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    insertDocument({
      uid: user.uid,
      nakedBody,
      formallyDressed,
      informallyDressed,
      sunExposedSkin,
      faceMakeup,
      cleanFace,
    });

    setSuccess(true);
    setNakedBody("");
    setFormallyDressed("");
    setInformallyDressed("");
    setSunExposedSkin("");
    setFaceMakeup("");
    setCleanFace("");
  };

  return (
    <div className={styles.PersonalAnalysis}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Para todas as perguntas dê uma nota de 0 a 10 e comente!</h2>

        <label>
          <span>Como voce avalia o seu corpo desnudo?</span>
          <textarea
            name="nakedBody"
            placeholder=""
            value={nakedBody}
            onChange={(e) => setNakedBody(e.target.value)}
          />
        </label>

        <label>
          <span>Como voce avalia o seu corpo vestido formalmente?</span>
          <textarea
            name="formallydressed"
            placeholder=""
            value={formallyDressed}
            onChange={(e) => setFormallyDressed(e.target.value)}
          />
        </label>

        <label>
          <span>Como voce avalia o seu corpo vestido informalmente?</span>
          <textarea
            name="informallydressed"
            placeholder=""
            value={informallyDressed}
            onChange={(e) => setInformallyDressed(e.target.value)}
          />
        </label>

        <label>
          <span>Como voce avalia o seu rosto maquiado?</span>
          <textarea
            name="faceMakeup"
            placeholder=""
            value={faceMakeup}
            onChange={(e) => setFaceMakeup(e.target.value)}
          />
        </label>

        <label>
          <span>Como voce avalia o seu rosto sem maquiagem?</span>
          <textarea
            name="cleanFace"
            placeholder=""
            value={cleanFace}
            onChange={(e) => setCleanFace(e.target.value)}
          />
        </label>

        <label>
          <span>Quando exposto ao sol como sua pele fica?</span>
          {optionSunExposedSkin.map((option) => (
            <label key={option} className={styles.radio}>
              <input
                type="radio"
                id="sunExposedSkin"
                value={sunExposedSkin}
                checked={sunExposedSkin === option}
                onChange={sunExposedSkinChoice}
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

export default PersonalAnalysis;
