import React, { useRef, useState } from "react";
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
  const [prosthetic, setProsthetic] = useState("");
  const [dentalTreatment, setDentalTreatment] = useState("");
  const [dietLike, setDietLike] = useState("");

  //Ref to focus
  const pathologiesRef = useRef(null);
  const dietPathologiesRef = useRef(null);
  const medicinesRef = useRef(null);
  const allergiesRef = useRef(null);
  const estheticTreatmentRef = useRef(null);
  const surgeryRef = useRef(null);
  const prostheticRef = useRef(null);
  const dentalTreatmentRef = useRef(null);
  const dietLikeRef = useRef(null);

  //formStates
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  //user const
  const { user } = useAuthValue();

  //insert const
  const { insertDocument, response } = useInsertDocument("health");

  //Pathologies Form
  const handleNoPathologies = (e) => {
    e.preventDefault();
    const pathologiesToggleDisabled = document.querySelector("#pathologies");
    pathologiesToggleDisabled.disabled = true;
    setPathologies("Não Possui");
  };
  const handleYesPathologies = (e) => {
    e.preventDefault();
    const pathologiesToggleDisabled = document.querySelector("#pathologies");
    pathologiesToggleDisabled.disabled = false;
    setPathologies("");
  };

  //Diet Pathologies Form
  const handleYesDietPathologies = (e) => {
    e.preventDefault();
    const dietPathologiesToggleDisabled =
      document.querySelector("#dietpathologies");
    dietPathologiesToggleDisabled.disabled = false;
    setDietPathologies("");
  };

  const handleNoDietPathologies = (e) => {
    e.preventDefault();
    const dietPathologiesToggleDisabled =
      document.querySelector("#dietpathologies");
    dietPathologiesToggleDisabled.disabled = true;
    setDietPathologies("Não Possui");
  };

  //Medicines Form
  const handleNoMedicines = (e) => {
    e.preventDefault();
    const pathologiesToggleDisabled = document.querySelector("#medicines");
    pathologiesToggleDisabled.disabled = true;
    setMedicines("Não Possui");
  };

  const handleYesMedicines = (e) => {
    e.preventDefault();
    const medicinesToggleDisabled = document.querySelector("#medicines");
    medicinesToggleDisabled.disabled = false;
    setMedicines("");
  };

  //Allergies Form
  const handleNoAllergies = (e) => {
    e.preventDefault();
    const allergiesToggleDisabled = document.querySelector("#allergies");
    allergiesToggleDisabled.disabled = true;
    setAllergies("Não Possui");
  };

  const handleYesAllergies = (e) => {
    e.preventDefault();
    const allergiesToggleDisabled = document.querySelector("#allergies");
    allergiesToggleDisabled.disabled = false;
    setAllergies("");
  };

  //estheticTreatment Form
  const handleNoEstheticTreatment = (e) => {
    e.preventDefault();
    const estheticTreatmentToggleDisabled =
      document.querySelector("#esthetictreatment");
    estheticTreatmentToggleDisabled.disabled = true;
    setEstheticTreatment("Não Possui");
  };

  const handleYesEstheticTreatment = (e) => {
    e.preventDefault();
    const estheticTreatmentToggleDisabled =
      document.querySelector("#esthetictreatment");
    estheticTreatmentToggleDisabled.disabled = false;
    setEstheticTreatment("");
  };

 //Surgery Form
 const handleNoSurgery = (e) => {
  e.preventDefault();
  const surgeryToggleDisabled =
    document.querySelector("#surgery");
  surgeryToggleDisabled.disabled = true;
  setSurgery("Não Possui");
};

const handleYesSurgery = (e) => {
  e.preventDefault();
  const surgeryToggleDisabled =
    document.querySelector("#surgery");
    surgeryToggleDisabled.disabled = false;
  setSurgery("");
};

 //Prosthetic Form
 const handleNoProsthetic = (e) => {
  e.preventDefault();
  const prostheticToggleDisabled =
    document.querySelector("#prosthetic");
  prostheticToggleDisabled.disabled = true;
  setProsthetic("Não Possui");
};

const handleYesProsthetic = (e) => {
  e.preventDefault();
  const prostheticToggleDisabled =
    document.querySelector("#prosthetic");
    prostheticToggleDisabled.disabled = false;
  setProsthetic("");
};


 //DentalTreatment Form
 const handleNoDentalTreatment = (e) => {
  e.preventDefault();
  const dentalTreatmentToggleDisabled =
    document.querySelector("#dentaltreatment");
  dentalTreatmentToggleDisabled.disabled = true;
  setDentalTreatment("Não Possui");
};

const handleYesDentalTreatment = (e) => {
  e.preventDefault();
  const dentalTreatmentToggleDisabled =
    document.querySelector("#dentaltreatment");
    dentalTreatmentToggleDisabled.disabled = false;
  setDentalTreatment("");
};




  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!pathologies) {
      setFormError(
        "Responda SIM ou Não e Descreva caso possua alguma patologia."
      );
      pathologiesRef.current.focus();
      return;
    }

    if (!dietLike) {
      setFormError("Descreva sua alimentação diária. Campo Obrigatório!");
      dietLikeRef.current.focus();
      return;
    }

    if (!dietPathologies) {
      setFormError(
        "Responda SIM ou Não e Descreva caso possua alguma dieta restritiva ligada a uma patologia."
      );
      dietPathologiesRef.current.focus();
      return;
    }

    if (!medicines) {
      setFormError(
        "Responda SIM ou Não e descreva seus medicamentos."
      );
      medicinesRef.current.focus();
      return;
    }

    if (!allergies) {
      setFormError(
        "Responda SIM ou Não e Descreva caso possua alguma alergia."
      );
      allergiesRef.current.focus();
      return;
    }

    if (!estheticTreatment) {
      setFormError(
        "Responda SIM ou Não e Descreva caso realize algum procedimento estético."
      );
      estheticTreatmentRef.current.focus();
      return;
    }

    if (!surgery) {
      setFormError(
        "Responda SIM ou Não e Descreva caso tenha realizado algum procedimento cirúrgico."
      );
      surgeryRef.current.focus();
      return;
    }

    
    if (!prosthetic) {
      setFormError(
        "Responda SIM ou Não e Descreva caso possua alguma prótese."
      );
      prostheticRef.current.focus();
      return;
    }

       
    if (!dentalTreatment) {
      setFormError(
        "Responda SIM ou Não e Descreva realize algum tratamento dentário."
      );
      dentalTreatmentRef.current.focus();
      return;
    }


    insertDocument({
      uid: user.uid,
      pathologies,
      dietPathologies,
      medicines,
      allergies,
      estheticTreatment,
      surgery,
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
    setProsthetic("");
    setDentalTreatment("");
  };

  return (
    <div className={styles.aboutme}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Me fale um pouco sobre a sua saúde</h2>
        <label>
          <div>
            <span>Voce possui alguma patologia?</span>
            <button onClick={handleYesPathologies}>SIM</button>
            <button onClick={handleNoPathologies}>Não</button>
          </div>

          <textarea
            name="pathologies"
            id="pathologies"
            placeholder="Descreva suas patologias?"
            value={pathologies}
            onChange={(e) => setPathologies(e.target.value)}
            ref={pathologiesRef}
          />
        </label>
        <label>
          <span>Como é sua alimentação?</span>
          <textarea
            name="dietlike"
            placeholder="Descreva sua alimentação diária."
            value={dietLike}
            onChange={(e) => setDietLike(e.target.value)}
            ref={dietLikeRef}
          />
        </label>
        <label>
          <div>
            <span>Faz alguma dieta relacionada à alguma patologia?</span>
            <button onClick={handleYesDietPathologies}>SIM</button>
            <button onClick={handleNoDietPathologies}>Não</button>
          </div>
          <textarea
            name="dietpathologies"
            id="dietpathologies"
            placeholder="Se possui alguma restrição alimentar descreva-a."
            value={dietPathologies}
            onChange={(e) => setDietPathologies(e.target.value)}
            ref={dietPathologiesRef}
          />
        </label>
        <label>
          <div>
            <span>Faz uso de medicamentos? Se Sim, quais?</span>
            <button onClick={handleYesMedicines}>SIM</button>
            <button onClick={handleNoMedicines}>Não</button>
          </div>
          <textarea
            name="medicines"
            id="medicines"
            placeholder="Descreva os medicamentos que faz uso."
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            ref={medicinesRef}
          />
        </label>
        <label>
          <div>
            <span>Voce possui alguma alergia? Se Sim, Descreva-as!</span>
            <button onClick={handleYesAllergies}>SIM</button>
            <button onClick={handleNoAllergies}>Não</button>
          </div>
          <textarea
            name="allergies"
            id="allergies"
            placeholder="Se possui alguma alergia descreva-a aqui."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            ref={allergiesRef}
          />
        </label>
        <label>
          <div>
            <span>
              Voce faz algum tratamento estético? Se Sim, descreva-os?
            </span>
            <button onClick={handleYesEstheticTreatment}>SIM</button>
            <button onClick={handleNoEstheticTreatment}>Não</button>
          </div>

          <textarea
            name="esthetictreatment"
            id="esthetictreatment"
            placeholder="Descreva os tratamentos estéticos que você faz!"
            value={estheticTreatment}
            onChange={(e) => setEstheticTreatment(e.target.value)}
            ref={estheticTreatmentRef}
          />
        </label>
        <label>

        <div>
        <span>
            Voce já fez alguma intervenção cirúrgica (estética ou não)? Se Sim, quais?
          </span>
            <button onClick={handleYesSurgery}>SIM</button>
            <button onClick={handleNoSurgery}>Não</button>
          </div>
          
          <textarea
            name="surgery"
            id="surgery"
            placeholder="Cite qualquer procedimento cirúrgico realizado!"
            value={surgery}
            onChange={(e) => setSurgery(e.target.value)}
            ref={surgeryRef}
          />
        </label>
        <label>
        <div>
         <span>Voce faz uso de alguma prótese? Se sim, quais?</span>
            <button onClick={handleYesProsthetic}>SIM</button>
            <button onClick={handleNoProsthetic}>Não</button>
          </div>
          <textarea
            name="prosthetic"
            id="prosthetic"
            placeholder="Cite todas as próteses que você usa atualmente."
            value={prosthetic}
            onChange={(e) => setProsthetic(e.target.value)}
            ref={prostheticRef}
          />
        </label>
        <label>
        <div>
        <span>Voce faz algum tratamento dentário? Se sim, quais?</span>
            <button onClick={handleYesDentalTreatment}>SIM</button>
            <button onClick={handleNoDentalTreatment}>Não</button>
          </div>
          
          <textarea
            name="dentaltreatment"
            id="dentaltreatment"
            placeholder="Cite qualquer tratamento dentário."
            value={dentalTreatment}
            onChange={(e) => setDentalTreatment(e.target.value)}
            ref={dentalTreatmentRef}
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
