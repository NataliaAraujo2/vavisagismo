import React, { useEffect, useState } from "react";
import styles from "../Data/Data.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Conclusion = () => {
  const form = "Formulário Inicial";
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [conclusionDate, setConclusionDate] = useState("")
  const { user } = useAuthValue();

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [render, setRender] = useState(false);

  //const conditional insert document
  const { documents: aboutme } = useFetchDocuments("aboutme", user.uid);
  const { documents: bodyMeasurement } = useFetchDocuments(
    "bodyMeasurement",
    user.uid
  );
  const { documents: contactdata } = useFetchDocuments("contactdata", user.uid);
  const { documents: health } = useFetchDocuments("health", user.uid);
  const { documents: lifestyle } = useFetchDocuments("lifestyle", user.uid);
  const { documents: personalanalysis } = useFetchDocuments(
    "personalanalysis",
    user.uid
  );
  const { documents: personaldata } = useFetchDocuments(
    "personaldata",
    user.uid
  );
  const { documents: personalstyle } = useFetchDocuments(
    "personalstyle",
    user.uid
  );
  const { documents: firstImages } = useFetchDocuments("firstImages", user.uid);

  const { insertDocument, response } = useInsertDocument("conclusion");

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      const d = new Date();
      let text = d.toLocaleDateString();
        console.log(text)

      setConclusionDate(text)

      const field = "uid";
      const demand = user.uid;
      await filterConclusion(field, demand);
    }

    loadData();

    if (filteredConclusion) {
      setRender(true);
    }

    return () => {
      setCancelled(true);
    };
  }, [cancelled, filterConclusion, filteredConclusion, user.uid]);

  console.log(conclusionDate)

  const conclusion = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (
      aboutme.length === 0 ||
      bodyMeasurement.length === 0 ||
      contactdata.length === 0 ||
      health.length === 0 ||
      lifestyle.length === 0 ||
      personalanalysis.length === 0 ||
      personaldata.length === 0 ||
      personalstyle.length === 0 ||
      firstImages.length === 0
    ) {
      setFormError(
        "Questionário incompleto. Por favor responda todas as perguntas!"
      );
      return;
    } else {
    
      insertDocument({
        conclusionDate,
        form,
        uid: user.uid,
      });
    }

    setSuccess(true);
  };

  return (
    <div className={styles.conclusion}>
      {render ? (
        <h1 className="danger">
          Formulário já enviado! Não é possível alterá-lo após sua conclusão!
        </h1>
      ) : (
        <>
          <h1 className="danger">Esse formulário é de envio único!</h1>
          <h2>Após concluído não poderá ser reenviado!</h2>
          <h3>
            <button className={styles.buttonConclusion}>Clique Aqui!</button> e
            revise suas resposta caso deseje ou clique no botão concluir!
          </h3>
          {!response.loading && (
            <button onClick={conclusion} className={styles.buttonConclusion}>
              CONCLUIR
            </button>
          )}
          {response.loading && <button disabled>Aguarde...</button>}
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
          {success && (
            <p className="success">Formulário enviado com sucesso!</p>
          )}
        </>
      )}
    </div>
  );
};

export default Conclusion;
