import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const AboutMe = () => {
  const [personalRevew, setPersonalRevew] = useState("");
  const [profissionalRevew, setProfissionalRevew] = useState();
  const [socialRevew, setSocialRevew] = useState("");
  const [facingSituations, setFacingSituations] = useState("");
  const [imageConvey, setImageConvey] = useState("");
  const [reasonForConsultancy, setReasonForConsultancy] = useState("");
  const [consultancyExpectations, setConsultancyExpectations] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("aboutme");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!personalRevew) {
      setFormError("A análise pessoal é obrigatória!");
      return;
    }
    if (!profissionalRevew) {
      setFormError("A análise profissional é obrigatório!");
      return;
    }
    if (!socialRevew) {
      setFormError("A análise social é obrigatório!");
      return;
    }

    insertDocument({
      personalRevew,
      profissionalRevew,
      socialRevew,
      facingSituations,
      imageConvey,
      reasonForConsultancy,
      consultancyExpectations,
      uid: user.uid,
    });

    setSuccess(true);
    setPersonalRevew("");
    setProfissionalRevew("");
    setSocialRevew("");
    setFacingSituations("");
    setImageConvey("");
    setReasonForConsultancy("");
    setConsultancyExpectations("");
  };

  return (
    <div className={styles.aboutme}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Me fale um pouco sobre voce!</h2>
        <label>
          <span>Análise Pessoal:</span>
          <textarea
            name="personalrevew"
            placeholder="Como você se vê?"
            value={personalRevew}
            onChange={(e) => setPersonalRevew(e.target.value)}
          />
        </label>
        <label>
          <span>Análise Profissional:</span>
          <textarea
            name="profissionalrevew"
            placeholder="Como você se vê como profissional?"
            value={profissionalRevew}
            onChange={(e) => setProfissionalRevew(e.target.value)}
          />
        </label>
        <label>
          <span>Análise Social:</span>
          <textarea
            name="socialrevew"
            placeholder="Como você se vê na sociedade?"
            value={socialRevew}
            onChange={(e) => setSocialRevew(e.target.value)}
          />
        </label>
        <label>
          <span>Sabe enfrentar situações distintas?</span>
          <textarea
            name="facingSituations"
            placeholder=""
            value={facingSituations}
            onChange={(e) => setFacingSituations(e.target.value)}
          />
        </label>
        <label>
          <span>O que você gostaria de transmitir com a sua imagem?</span>
          <textarea
            name="imageConvey"
            placeholder=""
            value={imageConvey}
            onChange={(e) => setImageConvey(e.target.value)}
          />
        </label>
        <label>
          <span>O que voce espera da consultoria visagista?</span>
          <textarea
            name="consultancyExpectations"
            placeholder=""
            value={consultancyExpectations}
            onChange={(e) => setConsultancyExpectations(e.target.value)}
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

export default AboutMe;
