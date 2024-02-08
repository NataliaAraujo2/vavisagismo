import React, { useState } from "react";
import styles from "./Form.module.css";
import PersonalData from "../../components/Data/PersonalData";
import ContactData from "../../components/Data/ContactData";
import AboutMe from "../../components/Data/AboutMe";
import Images from "../../components/Data/Images";
import BodyMeasurement from "../../components/Data/BodyMeasurement";
import Lifestyle from "../../components/Data/Lifestyle";
import Health from "../../components/Data/Health";
import PersonalAnalysis from "../../components/Data/PersonalAnalysis";

const Form = () => {
  const [showPersonalData, setPersonalData] = useState(false);
  const [showContactdata, setContactData] = useState(false);
  const [showAboutMe, setAboutMe] = useState(false);
  const [showImages, setImages] = useState(false);
  const [showBodyMeasurement, setBodyMeasurement] = useState(false);
  const [showLifestyle, setLifestyle] = useState(false);
  const [showHealth, setHealth] = useState(false)
  const [showPersonalAnalysis, setPersonalAnalysis] = useState(false)
  

  const personalData = () => {
    setPersonalData(true);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const contactData = () => {
    setPersonalData(false);
    setContactData(true);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const aboutMe = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(true);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const images = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(true);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const bodyMeasurement = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(true);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const lifestyle = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(true);
    setHealth(false)
    setPersonalAnalysis(false)
  };

  const health = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(true)
    setPersonalAnalysis(false)
  };

  const personalAnalysis = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false);
    setImages(false);
    setBodyMeasurement(false);
    setLifestyle(false);
    setHealth(false)
    setPersonalAnalysis(true)
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
          Contato
        </button>
        <button onClick={aboutMe} className={showAboutMe ? styles.active : ""}>
          Quem eu sou
        </button>
        <button onClick={personalAnalysis} className={showPersonalAnalysis ? styles.active : ""}>
          Como eu me vejo
        </button>
        <button
          onClick={bodyMeasurement}
          className={showBodyMeasurement ? styles.active : ""}
        >
          Medidas
        </button>

        <button
          onClick={lifestyle}
          className={showLifestyle ? styles.active : ""}
        >
          Estilo de Vida
        </button>
        <button
          onClick={health}
          className={showHealth ? styles.active : ""}
        >
          Saúde
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
      !showLifestyle &&
      !showHealth &&
      !showPersonalAnalysis ? (
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
          {showLifestyle === true && <Lifestyle />}
          {showHealth === true && <Health />}
          {showPersonalAnalysis === true && <PersonalAnalysis />}
        </div>
      )}
    </div>
  );
};

export default Form;
