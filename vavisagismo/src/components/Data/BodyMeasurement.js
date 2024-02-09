import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";


const BodyMeasurement = () => {
  const [shoulderMeasure, setShoulderMeasure] = useState("");
  const [waistMeasure, setWaistMeasure] = useState("");
  const [hipMeasure, setHipMeasure] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("bodyMeasurement");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")
    setSuccess("")

    if (!shoulderMeasure) {
      setFormError("A medida do ombro é obrigatória!");
      return;
    }

    if (!waistMeasure) {
      setFormError("A medida do cintura é obrigatória!");
      return;
    }

    if (!hipMeasure) {
      setFormError("A medida do quadril é obrigatória!");
      return;
    }

    insertDocument({
      shoulderMeasure,
      waistMeasure,
      hipMeasure,
      uid: user.uid,
    });

   

    setSuccess(true);
    setShoulderMeasure("");
    setWaistMeasure("");
    setHipMeasure("");
  };

  return (
    <div className={styles.bodymeasurement}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Medida do Ombro (Medir a circunferência):</span>
          <textarea
            name="shouldermeasure"
            placeholder="Medida do ombro em cm"
            value={shoulderMeasure}
            onChange={(e) => setShoulderMeasure(e.target.value)}
          />
        </label>
        <label>
          <span>Medida da Cintura (2 dedos acima do umbigo):</span>
          <textarea
            name="waistmeasure"
            placeholder="Medida da cintura em cm"
            value={waistMeasure}
            onChange={(e) => setWaistMeasure(e.target.value)}
          />
        </label>
        <label>
          <span>Medida do Quadril (Circunferência - meio do bumbum):</span>
          <textarea
            name="socialrevew"
            placeholder="Medida do bumbum em cm"
            value={hipMeasure}
            onChange={(e) => setHipMeasure(e.target.value)}
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

export default BodyMeasurement;
