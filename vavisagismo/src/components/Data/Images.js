import React, { useState } from "react";
import styles from "./Data.module.css";

const Images = () => {
  const [photoChoice, setPhotoChoice] = useState("");
  const [photoType, setPhotoType] = useState("");

  const [progress, setProgress] = useState(0);

  const options = [
    "Rosto - Perfil",
    "Rosto - Frente",
    "Rosto - Nuca",
    "Corpo - Perfil",
    "Corpo - Frente",
    "Corpo - Costas",
  ];

  const handleChange = (e) => {
    setPhotoType(e.target.value);
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(photoType);
  };

  return (
    <div>
      <h1>Atenção!</h1>
      <p>
        - As fotos deverão ser tiradas com roupa justa, (legging e regata).
        <br />- As fotos de rosto deverão ser tiradas sem maquiagem e cabelo
        preso em coque.
      </p>

      <form onSubmit={handleSubmit} className={styles.imagesform}>
        {options.map((option) => (
         
            <button key={option}>
              <input
                type="radio"
                value={option}
                checked={photoType === option}
                onChange={handleChange}
              />
              {option}
            </button>
         
        ))}
        <label>
          <input
            type="file"
            onChange={(e) => setPhotoChoice(e.target.files)}
            value={photoChoice}
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

export default Images;
