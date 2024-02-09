import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const PersonalStyle = () => {
  const [color, setColor] = useState("");
  const [detailsStyle, setDetailsStyle] = useState("");
  const [accessories, setAccessories] = useState("");
  const [style, setStyle] = useState("");
  const [seasons, setSeasons] = useState("");
  const [shoes, setShoes] = useState("");
  const [makeup, setMakeup] = useState("");

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("personalstyle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    insertDocument({
      uid: user.uid,
      color,
      detailsStyle,
      accessories,
      style,
      seasons,
      shoes,
      makeup,
    });

    setSuccess(true);
    setColor("");
    setDetailsStyle("");
    setAccessories("");
    setStyle("");
    setSeasons("");
    setShoes("");
    setMakeup("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Qual cor prefere?</span>
          <textarea
            name="color"
            placeholder=""
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          <span>Gosta de brilho, transparências, decotes, fendas?</span>
          <textarea
            name="detailsStyle"
            placeholder=""
            value={detailsStyle}
            onChange={(e) => setDetailsStyle(e.target.value)}
          />
        </label>
        <label>
          <span>Usa acessórios? Quais mais gosta?</span>
          <textarea
            name="accessories"
            placeholder=""
            value={accessories}
            onChange={(e) => setAccessories(e.target.value)}
          />
        </label>
        <label>
          <span>Usa acessórios? Quais mais gosta?</span>
          <textarea
            name="style"
            placeholder=""
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </label>
        <label>
          <span>Prefere se vestir no verão ou no inverno?</span>
          <textarea
            name="seasons"
            placeholder=""
            value={seasons}
            onChange={(e) => setSeasons(e.target.value)}
          />
        </label>
        <label>
          <span>Prefere tênis ou salto?</span>
          <textarea
            name="shoes"
            placeholder=""
            value={shoes}
            onChange={(e) => setShoes(e.target.value)}
          />
        </label>
        <label>
          <span>Usa maquiagem com frequência ou está sempre sem?</span>
          <textarea
            name="makeup"
            placeholder=""
            value={makeup}
            onChange={(e) => setMakeup(e.target.value)}
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

export default PersonalStyle;
