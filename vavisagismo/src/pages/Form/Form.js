import React, { useState } from "react";
import styles from "./Form.module.css";
import PersonalData from "../../components/Data/PersonalData";
import ContactData from "../../components/Data/ContactData";
import AboutMe from "../../components/Data/AboutMe";
import Images from "../../components/Data/Images";

const Form = () => {
  const [showPersonalData, setPersonalData] = useState(false);
  const [showContactdata, setContactData] = useState(false);
  const [showAboutMe, setAboutMe] = useState(false);
  const [showImages, setImages] = useState(false);

  const personalData = () => {
    setPersonalData(true);
    setContactData(false);
    setAboutMe(false)
    setImages(false)
  };

  const contactData = () => {
    setPersonalData(false);
    setContactData(true);
    setAboutMe(false)
    setImages(false)
  };

  const aboutMe = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(true)
    setImages(false)
  };

  const images = () => {
    setPersonalData(false);
    setContactData(false);
    setAboutMe(false)
    setImages(true)
  };


  return (
    <div className={styles.form}>
      <div className={styles.buttons}>
        <button onClick={personalData}>Dados Pessoais</button>
        <button onClick={contactData}>Dados de Contato</button>
        <button onClick={aboutMe}>Como eu me vejo</button>
        <button onClick={images}>Fotos</button>
      </div>
      <div className={styles.component}>
        {showPersonalData === true && <PersonalData />}
        {showContactdata === true && <ContactData />}
        {showAboutMe === true && <AboutMe />}
        {showImages === true && <Images />}
      </div>
    </div>
  );
};

export default Form;
