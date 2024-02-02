import React, { useState } from "react";
import styles from "./Data.module.css";

const AboutMe = () => {
    const [personalRevew, setPersonalRevew] = useState("");
    const [profissionalRevew, setProfissionalRevew ] = useState();
    const [socialRevew, setSocialRevew] = useState("");
    const [enneagramProfile, setEnneagramProfile] = useState("");

    const handleSubmit =(e) => {
        e.prevent.Default()
    }

  return (
    <div className={styles.aboutme}>
        <h2>Me fale um pouco sobre voce!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Análise Pessoal:</span>
          <textarea
            name="personalrevew"
            required
            placeholder="Como você se vê?"
            value={personalRevew}
            onChange={(e) => setPersonalRevew(e.target.value)}
          />
        </label>
        <label>
          <span>Análise Profissional:</span>
          <textarea
            name="profissionalrevew"
            required
            placeholder="Como você se vê como profissional?"
            value={profissionalRevew}
            onChange={(e) => setProfissionalRevew(e.target.value)}
          />
        </label>
        <label>
          <span>Análise Social:</span>
          <textarea
            name="socialrevew"
            required
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
            required
            placeholder="Perfil do Eneagrama"
            value={enneagramProfile}
            onChange={(e) => setEnneagramProfile(e.target.value)}
          />
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

export default AboutMe;
