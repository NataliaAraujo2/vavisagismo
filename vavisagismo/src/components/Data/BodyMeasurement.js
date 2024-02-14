import React, { useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";


const BodyMeasurement = () => {
  const [shoulderMeasure, setShoulderMeasure] = useState("");
  const [waistMeasure, setWaistMeasure] = useState("");
  const [hipMeasure, setHipMeasure] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  //ureRef focus
const shoulderMeasureRef = useRef(null)
const waistMeasureRef = useRef(null)
const hipMeasureRef = useRef(null)

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("bodyMeasurement");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")
    setSuccess("")

    if (!shoulderMeasure) {
      setFormError("A medida do ombro é obrigatória!");
      shoulderMeasureRef.current.focus()
      return;
    }

    if (!waistMeasure) {
      setFormError("A medida do cintura é obrigatória!");
      waistMeasureRef.current.focus()
      return;
    }

    if (!hipMeasure) {
      setFormError("A medida do quadril é obrigatória!");
      hipMeasureRef.current.focus()
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
            ref={shoulderMeasureRef}
            value={shoulderMeasure}
            onChange={(e) => setShoulderMeasure(e.target.value)}
          />
        </label>
        <label>
          <span>Medida da Cintura (2 dedos acima do umbigo):</span>
          <textarea
            name="waistmeasure"
            placeholder="Medida da cintura em cm"
            ref={waistMeasureRef}
            value={waistMeasure}
            onChange={(e) => setWaistMeasure(e.target.value)}
          />
        </label>
        <label>
          <span>Medida do Quadril (Circunferência - meio do bumbum):</span>
          <textarea
            name="hipMeasure"
            placeholder="Medida do bumbum em cm"
            ref={hipMeasureRef}
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
