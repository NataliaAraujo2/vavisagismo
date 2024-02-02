import React, { useState } from 'react'
import styles from "./Data.module.css";
import PhoneMaskedInput from "../../mask/PhoneMaskedInput";


const ContactData = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber ] = useState();
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [linkedin, setLinkedin] = useState("");

    const handleSubmit =(e) => {
      e.prevent.Default()
  }
  

  return (
    <div className={styles.contactData}>
        <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            value={email}
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
            required
            placeholder="Endereço do Instagram"
            value={instagram }
            onChange={(e) => setInstagram(e.target.value)}
          />
        </label>
        <label>
          <span>Facebook:</span>
          <input
            type="text"
            name="facebook"
            required
            placeholder="Endereço do Facebook"
            value={facebook }
            onChange={(e) => setFacebook(e.target.value)}
          />
        </label>
        <label>
          <span>Linkedin:</span>
          <input
            type="text"
            name="linkedin"
            required
            placeholder="Endereço do Linkedin"
            value={linkedin }
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </label>
        <button>Enviar</button>
    {/*
     {!loading && <button>Enviar</button>}
        {loading && <button disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
    */}   
        </form>
    </div>
  )
}

export default ContactData;