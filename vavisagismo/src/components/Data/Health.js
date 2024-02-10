import React, { useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const Health = () => {
  const [pathologies, setPathologies] = useState("");
  const [dietPathologies, setDietPathologies] = useState("");
  const [medicines, setMedicines] = useState("");
  const [allergies, setAllergies] = useState("");
  const [estheticTreatment, setEstheticTreatment] = useState("");
  const [surgery, setSurgery] = useState("");
  const [bodyTreatment, setBodyTreatment] = useState("");
  const [prosthetic, setProsthetic] = useState("");
  const [dentalTreatment, setDentalTreatment] = useState("");
  const [dietLike, setDietLike] = useState("");

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("health");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    insertDocument({
      uid: user.uid,
      pathologies,
      dietPathologies,
      medicines,
      allergies,
      estheticTreatment,
      surgery,
      bodyTreatment,
      prosthetic,
      dentalTreatment,
    });

    setSuccess(true);
    setPathologies("");
    setDietPathologies("");
    setMedicines("");
    setAllergies("");
    setEstheticTreatment("");
    setSurgery("");
    setBodyTreatment("");
    setProsthetic("");
    setDentalTreatment("");
  };

  return (
    <div className={styles.aboutme}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Me fale um pouco sobre a sua saúde</h2>
        <label>
          <span>Voce possui alguma patologia?</span>
          <textarea
            name="personalrevew"
            placeholder="Descreva suas patologias?"
            value={pathologies}
            onChange={(e) => setPathologies(e.target.value)}
          />
        </label>
        <label>
          <span>Como é sua alimentação?</span>
          <textarea
            name="dietlike"
            placeholder="Descreva sua alimentação diária."
            value={dietLike}
            onChange={(e) => setDietLike(e.target.value)}
          />
        </label>
        <label>
          <span>Faz alguma dieta relacionada à alguma patologia?</span>
          <textarea
            name="dietpathologies"
            placeholder="Se possui alguma restrição alimentar descreva-a."
            value={dietPathologies}
            onChange={(e) => setDietPathologies(e.target.value)}
          />
        </label>
        <label>
          <span>Faz uso de medicamentos? Quais?</span>
          <textarea
            name="medicines"
            placeholder="Se possui alguma restrição alimentar descreva-a."
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
          />
        </label>
        <label>
          <span>Voce possui alguma alergia? Quais?</span>
          <textarea
            name="allergies"
            placeholder="Se possui alguma alergia descreva-a aqui."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </label>
        <label>
          <span>Voce faz algum tratamento estético? Quais?</span>
          <textarea
            name="esthetictreatment"
            placeholder="Descreva os tratamentos estéticos que você faz!"
            value={estheticTreatment}
            onChange={(e) => setEstheticTreatment(e.target.value)}
          />
        </label>
        <label>
          <span>
            Voce já fez alguma intervenção cirúrgica (estética ou não)? Quais?
          </span>
          <textarea
            name="surgery"
            placeholder="Cite qualquer procedimento cirúrgico realizado!"
            value={surgery}
            onChange={(e) => setSurgery(e.target.value)}
          />
        </label>
        <label>
          <span>Voce faz uso de alguma prótese? Quais?</span>
          <textarea
            name="prosthetic"
            placeholder="Cite todas as próteses que você usa atualmente."
            value={prosthetic}
            onChange={(e) => setProsthetic(e.target.value)}
          />
        </label>
        <label>
          <span>Voce faz algum tratamento dentário? Quais?</span>
          <textarea
            name="dentaltreatment"
            placeholder="Cite qualquer tratamento dentário."
            value={dentalTreatment}
            onChange={(e) => setDentalTreatment(e.target.value)}
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

export default Health;
