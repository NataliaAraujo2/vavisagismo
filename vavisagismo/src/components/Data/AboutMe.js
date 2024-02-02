import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const AboutMe = () => {
  const [personalRevew, setPersonalRevew] = useState("");
  const [profissionalRevew, setProfissionalRevew] = useState();
  const [socialRevew, setSocialRevew] = useState("");
  const [enneagramProfile, setEnneagramProfile] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("aboutme");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    insertDocument({
      personalRevew,
      profissionalRevew,
      socialRevew,
      enneagramProfile,
      uid: user.uid,
    });

    if (!personalRevew) {
      setFormError("A análise pessoal é obrigatória!");
      return
    }
    if (!profissionalRevew) {
      setFormError("A análise profissional é obrigatório!");
      return
    }
    if (!socialRevew) {
      setFormError("A análise social é obrigatório!");
      return
    }
  
    setSuccess(true);
    setPersonalRevew("");
    setProfissionalRevew("");
    setSocialRevew("");
    setEnneagramProfile("");
  };

  return (
    <div className={styles.aboutme}>
      <h2>Me fale um pouco sobre voce!</h2>
      <form onSubmit={handleSubmit}>
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
          <span>Perfil no Eneagrama</span>
          <input
            type="text"
            name="enneagramProfile"
        
            placeholder="Perfil do Eneagrama"
            value={enneagramProfile}
            onChange={(e) => setEnneagramProfile(e.target.value)}
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
