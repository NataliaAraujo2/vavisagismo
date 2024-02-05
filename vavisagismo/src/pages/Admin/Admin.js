import React, { useState } from "react";
import styles from "./Admin.module.css";
import PersonalData from "../../components/Data/PersonalData";
import ContactData from "../../components/Data/ContactData";
import AboutMe from "../../components/Data/AboutMe";
import Images from "../../components/Data/Images";
import BodyMeasurement from "../../components/Data/BodyMeasurement";
import AdditionalQuestions from "../../components/Data/AdditionalQuestions";

const Admin = () => {
  const [showPersonalData, setPersonalData] = useState(false);
  const [showContactdata, setContactData] = useState(false);
  const [showAboutMe, setAboutMe] = useState(false);
  const [showImages, setImages] = useState(false);
  const [showBodyMeasurement, setBodyMeasurement] = useState();
  const [showAdditionalQuestions, setAdditionalQuestions] = useState();

  const personalData = () => {
    setPersonalData(true);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setAdditionalQuestions(false)
  };

  const contactData = () => {
    setPersonalData(false);
    setContactData(true);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setAdditionalQuestions(false)
  };

  const aboutMe = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(true);
    setImages(false);
    setBodyMeasurement(false);
    setAdditionalQuestions(false)
  };

  const images = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(true);
    setBodyMeasurement(false);
    setAdditionalQuestions(false)
  };

  const bodyMeasurement = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(true);
    setAdditionalQuestions(false)
  };

  const additionalQuestions = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setAdditionalQuestions(true)
  };


  
  return (
    <div className={styles.form}>
    <div className={styles.buttons}>
      <button
        onClick={personalData}
        className={showPersonalData ? styles.active : ""}
      >
        Dados Pessoais
      </button>
      <button
        onClick={contactData}
        className={showContactdata ? styles.active : ""}
      >
        Dados de Contato
      </button>
      <button onClick={aboutMe} className={showAboutMe ? styles.active : ""}>
        Como eu me vejo
      </button>
      <button
        onClick={bodyMeasurement}
        className={showBodyMeasurement ? styles.active : ""}
      >
        Medidas
      </button>
      <button onClick={additionalQuestions} className={showAdditionalQuestions ? styles.active : ""}>
        Questões Complementares
      </button>
      <button onClick={images} className={showImages ? styles.active : ""}>
        Fotos
      </button>
    </div>
    {!showPersonalData &&
    !showContactdata &&
    !showAboutMe &&
    !showImages &&
    !showBodyMeasurement &&
    !showAdditionalQuestions ? (
      <div className={styles.message}>
        <p>
          “Nossa imagem externa é nosso mensageiro, uma declaração pública.
          Alguns disfarces estão fortemente ligados aos nossos medos mais
          íntimos, e neste caso a roupa funciona como escudo para nos ocultar
          e proteger” <br />
          Gianni Versace
        </p>
        <h2>Atenção!!</h2>
        <p>
          - As fotos deverão ser tiradas com roupa justa (legging e regata){" "}
        </p>
        <p>
          - As fotos de rosto deverão ser tiradas sem maquiagem e o cabelo
          preso em coque alto.{" "}
        </p>
      </div>
    ) : (
      <div className={styles.component}>
        {showPersonalData === true && <PersonalData />}
        {showContactdata === true && <ContactData />}
        {showAboutMe === true && <AboutMe />}
        {showImages === true && <Images />}
        {showBodyMeasurement === true && <BodyMeasurement />}
        {showAdditionalQuestions ===true && <AdditionalQuestions />}
      </div>
    )}
  </div>
  )
}

export default Admin