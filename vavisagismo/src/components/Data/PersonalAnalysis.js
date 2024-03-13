import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const PersonalAnalysis = () => {
  //Form const
  const [nakedBody, setNakedBody] = useState("");
  const [formallyDressed, setFormallyDressed] = useState("");
  const [informallyDressed, setInformallyDressed] = useState("");
  const [sunExposedSkin, setSunExposedSkin] = useState("");
  const [faceMakeup, setFaceMakeup] = useState("");
  const [cleanFace, setCleanFace] = useState("");

  //Ref to focus
  const nakedBodyRef = useRef(null);
  const formallyDressedRef = useRef(null);
  const informallyDressedRef = useRef(null);
  const sunExposedSkinRef = useRef(null);
  const faceMakeupRef = useRef(null);
  const cleanFaceRef = useRef(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //const Form Error e Success

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("personalanalysis");

  const { documents: personalAnalysis } = useFetchDocuments(
    "personalanalysis",
    user.uid
  );
  const { updateDocument } = useUpdateDocument("personalanalysis");

  const optionSunExposedSkin = ["Vermelha", "Rosada", "Dourada"];

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

  const handleChange = (e) => {
    setSunExposedSkin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!nakedBody) {
      setFormError(
        "Como voce avalia o seu corpo desnudo? Resposta Obrigatória!."
      );
      nakedBodyRef.current.focus();
      return;
    }

    if (!formallyDressed) {
      setFormError(
        "Como voce avalia o seu corpo vestido formalmente? Resposta Obrigatória!"
      );
      formallyDressedRef.current.focus();
      return;
    }

    if (!informallyDressed) {
      setFormError(
        "Como voce avalia o seu corpo vestido informalmente? Resposta Obrigatória!"
      );
      informallyDressedRef.current.focus();
      return;
    }

    if (!faceMakeup) {
      setFormError(
        "Como voce avalia o seu rosto maquiado? Resposta Obrigatória!"
      );
      faceMakeupRef.current.focus();
      return;
    }

    if (!cleanFace) {
      setFormError(
        "Como voce avalia o seu rosto sem maquiagem? Resposta Obrigatória!"
      );
      cleanFaceRef.current.focus();
      return;
    }

    if (!sunExposedSkin) {
      setFormError(
        "Quando exposto ao sol como sua pele fica? Resposta Obrigatória!"
      );
      sunExposedSkinRef.current.focus();
      return;
    }

    const data = {
      nakedBody,
      formallyDressed,
      informallyDressed,
      sunExposedSkin,
      faceMakeup,
      cleanFace,
    };

    if (personalAnalysis) {
      for (var i = 0; i < personalAnalysis.length; i++) {
        if (personalAnalysis[i].uid === user.uid) {
          updateDocument(personalAnalysis[i].id, data);
        }
      }
    }

    if (personalAnalysis.length === 0) {
      insertDocument({
        uid: user.uid,
        nakedBody,
        formallyDressed,
        informallyDressed,
        sunExposedSkin,
        faceMakeup,
        cleanFace,
      });
    }

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
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Para todas as perguntas dê uma nota de 0 a 10 e comente!</h2>

          <label>
            <span>Como voce avalia o seu corpo desnudo?</span>
            <textarea
              name="nakedBody"
              placeholder=""
              value={nakedBody}
              onChange={(e) => setNakedBody(e.target.value)}
              ref={nakedBodyRef}
            />
          </label>

          <label>
            <span>Como voce avalia o seu corpo vestido formalmente?</span>
            <textarea
              name="formallydressed"
              placeholder=""
              value={formallyDressed}
              onChange={(e) => setFormallyDressed(e.target.value)}
              ref={formallyDressedRef}
            />
          </label>

          <label>
            <span>Como voce avalia o seu corpo vestido informalmente?</span>
            <textarea
              name="informallydressed"
              placeholder=""
              value={informallyDressed}
              onChange={(e) => setInformallyDressed(e.target.value)}
              ref={informallyDressedRef}
            />
          </label>

          <label>
            <span>Como voce avalia o seu rosto maquiado?</span>
            <textarea
              name="faceMakeup"
              placeholder=""
              value={faceMakeup}
              onChange={(e) => setFaceMakeup(e.target.value)}
              ref={faceMakeupRef}
            />
          </label>

          <label>
            <span>Como voce avalia o seu rosto sem maquiagem?</span>
            <textarea
              name="cleanFace"
              placeholder=""
              value={cleanFace}
              onChange={(e) => setCleanFace(e.target.value)}
              ref={cleanFaceRef}
            />
          </label>

          <label>
            <span>Quando exposto ao sol como sua pele fica?</span>
            {optionSunExposedSkin.map((option) => (
              <label key={option} className={styles.radio}>
                <input
                  type="radio"
                  value={option}
                  checked={sunExposedSkin === option}
                  onChange={handleChange}
                  ref={sunExposedSkinRef}
                />
                {option}
              </label>
            ))}
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

export default PersonalAnalysis;
