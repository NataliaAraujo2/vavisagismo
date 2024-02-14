import React, { useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const ContactData = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  //useRef focus
  const phoneNumberRef = useRef(null);
  const instagramRef = useRef(null);
  const facebookRef = useRef(null);
  const linkedinRef = useRef(null);

  //User Const
  const { user } = useAuthValue();
  const email = user.email;

  //insertDocument Const
  const { insertDocument, response } = useInsertDocument("contactdata");

  //Phone Mask
  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };
  const handlePhone = (e) => {
    let input = e.target;
    input.value = phoneMask(input.value);
  };

  //Toggle const
  const [toggleInstagram, setToggleInstagram] = useState(false);
  const [toggleFacebook, setToggleFacebook] = useState(false);
  const [toggleLinkedin, setToggleLinkedin] = useState(false);

  //Disabled inputs function
  const handleDisabledInputInstagram = (e) => {
    e.preventDefault();
    if (toggleInstagram) {
      const instagramDisabled = document.querySelector("#instagram");
      instagramDisabled.disabled = false;
      setInstagram("");
      setToggleInstagram(false);
    } else {
      const instagramDisabled = document.querySelector("#instagram");
      instagramDisabled.disabled = true;
      setInstagram("Não Possuo");
      setToggleInstagram(true);
    }
  };

  const handleDisabledInputFacebook = (e) => {
    e.preventDefault();
    if (toggleFacebook) {
      const facebookDisabled = document.querySelector("#facebook");
      facebookDisabled.disabled = false;
      setFacebook("");
      setToggleFacebook(false);
    } else {
      const facebookDisabled = document.querySelector("#facebook");
      facebookDisabled.disabled = true;
      setFacebook("Não Possuo");
      setToggleFacebook(true);
    }
  };

  const handleDisabledInputLinkedin = (e) => {
    e.preventDefault();
    if (toggleLinkedin) {
      const linkedinDisabled = document.querySelector("#linkedin");
      linkedinDisabled.disabled = false;
      setLinkedin("");
      setToggleLinkedin(false);
    } else {
      const linkedinDisabled = document.querySelector("#linkedin");
      linkedinDisabled.disabled = true;
      setLinkedin("Não Possuo");
      setToggleLinkedin(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!phoneNumber) {
      setFormError("O telefone é obrigatório!");
      phoneNumberRef.current.focus();
      return;
    }

    if (!instagram) {
      setFormError(
        "O instagram é obrigatório! Se não possui clica em Não possuo"
      );
      instagramRef.current.focus();
      return;
    }
    if (!facebook) {
      setFormError(
        "O facebook é obrigatório! Se não possui clica em Não possuo"
      );
      facebookRef.current.focus();
      return;
    }
    if (!linkedin) {
      setFormError(
        "O linkedin é obrigatório! Se não possui clica em Não possuo"
      );
      linkedinRef.current.focus();
      return;
    }

    insertDocument({
      email: user.email,
      phoneNumber,
      instagram,
      facebook,
      linkedin,
      uid: user.uid,
    });

    //clear data fields
    setSuccess(true);
    setPhoneNumber("");
    setInstagram("");
    setFacebook("");
    setLinkedin("");

    //disable data fields
    const instagramDisabled = document.querySelector("#instagram");
    instagramDisabled.disabled = true;
    const facebookDisabled = document.querySelector("#facebook");
    facebookDisabled.disabled = true;
    const linkedinDisabled = document.querySelector("#linkedin");
    linkedinDisabled.disabled = true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <span>Email: {email}</span>
        <label>
          <span>Telefone:</span>
          <input
            type="tel"
            maxLength="15"
            onKeyUp={handlePhone}
            ref={phoneNumberRef}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label>
          <div className={styles.disabled}>
            <span>Instagram:</span>
            <button onClick={handleDisabledInputInstagram}>
              {toggleInstagram ? "Possuo" : "Não Possuo"}
            </button>
          </div>
          <input
            type="text"
            id="instagram"
            name="instagram"
            placeholder="Endereço do Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            ref={instagramRef}
          />
        </label>
        <label>
        <div className={styles.disabled}>
            <span>Facebook:</span>
            <button onClick={handleDisabledInputFacebook}>
              {toggleFacebook ? "Possuo" : "Não Possuo"}
            </button>
          </div>
          <input
            type="text"
            id="facebook"
            name="facebook"
            placeholder="Endereço do Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            ref={facebookRef}
          />
        </label>
        <label>
        <div className={styles.disabled}>
            <span>Linkedin:</span>
            <button onClick={handleDisabledInputLinkedin}>
              {toggleLinkedin ? "Possuo" : "Não Possuo"}
            </button>
          </div>
          <input
            type="text"
            name="linkedin"
            id="linkedin"
            placeholder="Endereço do Linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            ref={linkedinRef}
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

export default ContactData;
