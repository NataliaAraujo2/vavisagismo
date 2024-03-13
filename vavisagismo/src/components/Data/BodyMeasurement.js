import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const BodyMeasurement = () => {
  const [shoulderMeasure, setShoulderMeasure] = useState("");
  const [waistMeasure, setWaistMeasure] = useState("");
  const [hipMeasure, setHipMeasure] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  //ureRef focus
  const shoulderMeasureRef = useRef(null);
  const waistMeasureRef = useRef(null);
  const hipMeasureRef = useRef(null);

  //const no render
  const [cancelled, setCancelled] = useState(false);
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //const insert a new document
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("bodyMeasurement");

  // const Modify an existing document
  const { documents: bodyMeasurement } = useFetchDocuments("bodyMeasurement", user.uid);
  const { updateDocument } = useUpdateDocument("bodyMeasurement");



  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      const field = "uid";
      const demand = user.uid;
      await filterConclusion(field, demand);
    }

    loadData();

    if (filteredConclusion) {
      setNoRender(true);
    }

    return () => {
      setCancelled(true);
    };
  }, [cancelled, filterConclusion, filteredConclusion, user.uid]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!shoulderMeasure) {
      setFormError("A medida do ombro é obrigatória!");
      shoulderMeasureRef.current.focus();
      return;
    }

    if (!waistMeasure) {
      setFormError("A medida do cintura é obrigatória!");
      waistMeasureRef.current.focus();
      return;
    }

    if (!hipMeasure) {
      setFormError("A medida do quadril é obrigatória!");
      hipMeasureRef.current.focus();
      return;
    }

    const data = {
      shoulderMeasure,
        waistMeasure,
        hipMeasure,
    };

    if (bodyMeasurement) {
      for (var i = 0; i < bodyMeasurement.length; i++) {
        if (bodyMeasurement[i].uid === user.uid) {
          updateDocument(bodyMeasurement[i].id, data);
        }
      }
    }

    if (bodyMeasurement.length === 0) {
      insertDocument({
        uid: user.uid,
        shoulderMeasure,
        waistMeasure,
        hipMeasure,
      });
  
    }

    setSuccess(true);
    setShoulderMeasure("");
    setWaistMeasure("");
    setHipMeasure("");
  };

  return (
    <div className={styles.bodymeasurement}>
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
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
          {success && (
            <p className="success">Respostas enviadas com sucesso!</p>
          )}
        </form>
      )}
    </div>
  );
};

export default BodyMeasurement;
