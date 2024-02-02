import React, { useState } from "react";
import styles from "./Data.module.css";
import PhoneMaskedInput from "../../mask/PhoneMaskedInput";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const ContactData = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("contactdata");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    insertDocument({
      email,
      phoneNumber,
      instagram,
      facebook,
      linkedin,
      uid: user.uid,
    });

    if (!email) {
      setEmail(user.email);
    }
    if (!phoneNumber) {
      setFormError("O telefone é obrigatório!");
      return;
    }
   

    setSuccess(true);
    setEmail("");
    setPhoneNumber("");
    setInstagram("");
    setFacebook("");
    setLinkedin("");
  };

  return (
    <div className={styles.contactData}>
      <form onSubmit={handleSubmit} className={styles.form}> 
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder={user.email}
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Telefone:</span>
          <PhoneMaskedInput
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Digite seu telefone com DDD."
          />
        </label>
        <label>
          <span>Instagram:</span>
          <input
            type="text"
            name="instagram"
            placeholder="Endereço do Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </label>
        <label>
          <span>Facebook:</span>
          <input
            type="text"
            name="facebook"
            placeholder="Endereço do Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </label>
        <label>
          <span>Linkedin:</span>
          <input
            type="text"
            name="linkedin"
            placeholder="Endereço do Linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
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
