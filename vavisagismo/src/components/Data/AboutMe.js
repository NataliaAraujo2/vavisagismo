import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

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
  const [cancelled, setCancelled] = useState(false);

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //useRef to Focus
  const personalRevewRef = useRef(null);
  const profissionalRevewRef = useRef(null);
  const socialRevewRef = useRef(null);
  const facingSituationsRef = useRef(null);
  const imageConveyRef = useRef(null);
  const reasonForConsultancyRef = useRef(null);
  const consultancyExpectationsRef = useRef(null);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("aboutme");
  const { documents: aboutme } = useFetchDocuments("aboutme", user.uid);
  const { updateDocument } = useUpdateDocument("aboutme");

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
    setSuccess("");

    if (!personalRevew) {
      setFormError("A análise pessoal é obrigatória!");
      personalRevewRef.current.focus();
      return;
    }
    if (!profissionalRevew) {
      setFormError("A análise profissional é obrigatório!");
      profissionalRevewRef.current.focus();
      return;
    }
    if (!socialRevew) {
      setFormError("A análise social é obrigatório!");
      socialRevewRef.current.focus();
      return;
    }

    if (!facingSituations) {
      setFormError(
        "A campo Sabe enfrentar situações distintas? é obrigatório!"
      );
      facingSituationsRef.current.focus();
      return;
    }

    if (!imageConvey) {
      setFormError(
        "A campo O que você gostaria de transmitir com a sua imagem? é obrigatório!"
      );
      imageConveyRef.current.focus();
      return;
    }

    if (!reasonForConsultancy) {
      setFormError(
        "A campo O que te motivou a fazer a consultoria visagista? é obrigatório!"
      );
      reasonForConsultancyRef.current.focus();
      return;
    }

    if (!consultancyExpectations) {
      setFormError(
        "A campo O que você gostaria de transmitir com a sua imagem? é obrigatório!"
      );
      consultancyExpectationsRef.current.focus();
      return;
    }

    const data = {
      personalRevew,
      profissionalRevew,
      socialRevew,
      facingSituations,
      imageConvey,
      reasonForConsultancy,
      consultancyExpectations,
    };

    if (aboutme) {
      for (var i = 0; i < aboutme.length; i++) {
        if (aboutme[i].uid === user.uid) {
          updateDocument(aboutme[i].id, data);
        }
      }
    }

    if(aboutme.length === 0) {
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
    }

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
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Me fale um pouco sobre voce!</h2>
          <label>
            <span>Análise Pessoal:</span>
            <textarea
              name="personalrevew"
              placeholder="Como você se vê?"
              ref={personalRevewRef}
              value={personalRevew}
              onChange={(e) => setPersonalRevew(e.target.value)}
            />
          </label>
          <label>
            <span>Análise Profissional:</span>
            <textarea
              name="profissionalrevew"
              placeholder="Como você se vê como profissional?"
              ref={profissionalRevewRef}
              value={profissionalRevew}
              onChange={(e) => setProfissionalRevew(e.target.value)}
            />
          </label>
          <label>
            <span>Análise Social:</span>
            <textarea
              name="socialrevew"
              placeholder="Como você se vê na sociedade?"
              ref={socialRevewRef}
              value={socialRevew}
              onChange={(e) => setSocialRevew(e.target.value)}
            />
          </label>
          <label>
            <span>Sabe enfrentar situações distintas?</span>
            <textarea
              name="facingSituations"
              placeholder=""
              ref={facingSituationsRef}
              value={facingSituations}
              onChange={(e) => setFacingSituations(e.target.value)}
            />
          </label>
          <label>
            <span>O que você gostaria de transmitir com a sua imagem?</span>
            <textarea
              name="imageConvey"
              placeholder=""
              ref={imageConveyRef}
              value={imageConvey}
              onChange={(e) => setImageConvey(e.target.value)}
            />
          </label>
          <label>
            <span> O que te motivou a fazer a consultoria visagista?</span>
            <textarea
              name="consultancyExpectations"
              placeholder=""
              ref={reasonForConsultancyRef}
              value={reasonForConsultancy}
              onChange={(e) => setReasonForConsultancy(e.target.value)}
            />
          </label>

          <label>
            <span>O que voce espera da consultoria visagista?</span>
            <textarea
              name="consultancyExpectations"
              placeholder=""
              ref={consultancyExpectationsRef}
              value={consultancyExpectations}
              onChange={(e) => setConsultancyExpectations(e.target.value)}
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

export default AboutMe;
