import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const Lifestyle = () => {
  //const forms
  const [smoke, setSmoke] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [physicalExercise, setPhysicalExercise] = useState("");
  const [tattoos, setTattoos] = useState("");

  //Ref to focus
  const smokeRef = useRef(null);
  const alcoholRef = useRef(null);
  const physicalExerciseRef = useRef(null);
  const tattoosRef = useRef(null);

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();
  //const insert new document
  const { insertDocument, response } = useInsertDocument("lifestyle");

  // const Modify an existing document
  const { documents: lifeStyle } = useFetchDocuments("lifestyle", user.uid);
  const { updateDocument } = useUpdateDocument("lifestyle");

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

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

  //Smoke Form
  const handleNoSmoke = (e) => {
    e.preventDefault();
    const smokeToggleDisabled = document.querySelector("#smoke");
    smokeToggleDisabled.disabled = true;
    setSmoke("Não Fuma");
  };
  const handleYesSmoke = (e) => {
    e.preventDefault();
    const smokeToggleDisabled = document.querySelector("#smoke");
    smokeToggleDisabled.disabled = false;
    setSmoke("");
  };

  //Alcohol Form
  const handleNoAlcohol = (e) => {
    e.preventDefault();
    const alcoholToggleDisabled = document.querySelector("#alcohol");
    alcoholToggleDisabled.disabled = true;
    setAlcohol("Não Bebe");
  };
  const handleYesAlcohol = (e) => {
    e.preventDefault();
    const alcoholToggleDisabled = document.querySelector("#alcohol");
    alcoholToggleDisabled.disabled = false;
    setAlcohol("");
  };

  //physicalExercise Form
  const handleNoPhysicalExercise = (e) => {
    e.preventDefault();
    const physicalExerciseToggleDisabled =
      document.querySelector("#physicalExercise");
    physicalExerciseToggleDisabled.disabled = true;
    setPhysicalExercise("Nunca faz exercícios físicos.");
  };
  const handleYesPhysicalExercise = (e) => {
    e.preventDefault();
    const physicalExerciseToggleDisabled =
      document.querySelector("#physicalExercise");
    physicalExerciseToggleDisabled.disabled = false;
    setPhysicalExercise("");
  };

  //tatoos Form
  const handleNoTattoos = (e) => {
    e.preventDefault();
    const tattoosToggleDisabled = document.querySelector("#tattoos");
    tattoosToggleDisabled.disabled = true;
    setTattoos("Não possui nenhuma tatuagem.");
  };
  const handleYesTattoos = (e) => {
    e.preventDefault();
    const tattoosToggleDisabled = document.querySelector("#tattoos");
    tattoosToggleDisabled.disabled = false;
    setTattoos("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!smoke) {
      setFormError(
        "Responda SIM ou Não. Se sim, informe a frequência e qual cigarro."
      );
      smokeRef.current.focus();
      return;
    }

    if (!alcohol) {
      setFormError(
        "Responda SIM ou Não. Se sim, informe a frequência e quais bebidas."
      );
      alcoholRef.current.focus();
      return;
    }

    if (!physicalExercise) {
      setFormError(
        "Responda SIM ou Não. Se sim, informe a frequência e quais exercícios."
      );
      physicalExerciseRef.current.focus();
      return;
    }

    if (!tattoos) {
      setFormError("Responda SIM ou Não. Se sim, descreva suas tatuagens..");
      tattoosRef.current.focus();
      return;
    }

    const data = {
      smoke,
      alcohol,
      physicalExercise,
      tattoos,
    };

    if (lifeStyle) {
      for (var i = 0; i < lifeStyle.length; i++) {
        if (lifeStyle[i].uid === user.uid) {
          updateDocument(lifeStyle[i].id, data);
        }
      }
    }

    if (lifeStyle.length === 0) {
      insertDocument({
        uid: user.uid,
        smoke,
        alcohol,
        physicalExercise,
        tattoos,
      });
    }

    setSuccess(true);
    setSmoke("");
    setAlcohol("");
    setPhysicalExercise("");
    setTattoos("");
  };

  return (
    <div>
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Me fale sobre o seu estilo de vida!</h2>
          <label>
            <div>
              <span>
                Você Fuma (cigarro eletrônico, cigarro normal ou narguile)? Se
                sim, qual e com frequência?
              </span>
              <button onClick={handleYesSmoke}>SIM</button>
              <button onClick={handleNoSmoke}>Não</button>
            </div>
            <textarea
              name="smoke"
              id="smoke"
              placeholder="Cite qual cigarro fuma e com que frequência"
              value={smoke}
              onChange={(e) => setSmoke(e.target.value)}
              ref={smokeRef}
            />
          </label>
          <label>
            <div>
              <span>
                Você consome bebidas alcoólicas? Se sim, com qual frequência?
              </span>
              <button onClick={handleYesAlcohol}>SIM</button>
              <button onClick={handleNoAlcohol}>Não</button>
            </div>
            <textarea
              name="alcohol"
              id="alcohol"
              placeholder="Comente com qual frequência você consome bebidas alcoólicas e quais?"
              value={alcohol}
              onChange={(e) => setAlcohol(e.target.value)}
              ref={alcoholRef}
            />
          </label>

          <label>
            <div>
              <span>
                Voce faz atividades físicas? Se sim, com qual frequência e quais
                exercícios.
              </span>
              <button onClick={handleYesPhysicalExercise}>SIM</button>
              <button onClick={handleNoPhysicalExercise}>Não</button>
            </div>
            <textarea
              name="physicalExercise"
              id="physicalExercise"
              placeholder="Descreva sua rotina de exercícios físicos"
              value={physicalExercise}
              onChange={(e) => setPhysicalExercise(e.target.value)}
              ref={physicalExerciseRef}
            />
          </label>

          <label>
            <div>
              <span>
                Voce possui tatuagens. Se sim, quantas e em qual região do
                corpo.
              </span>
              <button onClick={handleYesTattoos}>SIM</button>
              <button onClick={handleNoTattoos}>Não</button>
            </div>
            <textarea
              name="tattoos"
              id="tattoos"
              placeholder="Descreva suas tatuagens"
              value={tattoos}
              onChange={(e) => setTattoos(e.target.value)}
              ref={tattoosRef}
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

export default Lifestyle;
