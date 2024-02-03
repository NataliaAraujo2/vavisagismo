import React, { useState } from "react";
import styles from "./Data.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";

const Images = () => {
  //const uploads
  const [imgURL, setImgURL] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const [progress, setProgress] = useState(0);
  const [typeChoiced, setTypeChoiced] = useState("");
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const [success, setSuccess] = useState(false);

  //const photos
  const [faceFront, setFaceFront] = useState(false);
  const [faceSide, setFaceSide] = useState(false);
  const [nape, setNape] = useState(false);
  const [bodyFront, setBodyFront] = useState(false);
  const [bodySide, setBodySide] = useState(false);
  const [bodyBack, setBodyBack] = useState(false);

  const faceFrontChoiced = (e) => {
    e.preventDefault();
    setFaceFront(true);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setTypeChoiced("facefront");
  };

  const faceSideChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(true);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setTypeChoiced("faceSide");
  };

  const napeChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(true);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setTypeChoiced("nape");
  };

  const bodyFrontChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(true);
    setBodySide(false);
    setBodyBack(false);
    setTypeChoiced("bodyFront");
  };

  const bodySideChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(true);
    setBodyBack(false);
    setTypeChoiced("bodySide");
  };

  const bodyBackChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(true);
    setTypeChoiced("bodyBack");
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (typeChoiced === "") {
      setFormError("Selecione de qual parte do corpo será a imagem enviada!");
      return;
    }

    const file = e.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `images/${user.displayName}.${typeChoiced}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgURL(url);
          if(url) {
            setSuccess(true);
            setImagePreview("")
          } else {
            setFormError("Ocorreu um erro! Tente novamente mais tarde")
          }
        });
      }
    );

   
    

  
    
  };

  return (
    <div className={styles.images}>
      <div className={styles.imagesform}>
        <h2>Selecione qual foto enviará!</h2>
        <div className={styles.buttons}>
          <button
            onClick={faceFrontChoiced}
            className={faceFront ? styles.active : ""}
          >
            Rosto - Frente
          </button>
          <button
            onClick={faceSideChoiced}
            className={faceSide ? styles.active : ""}
          >
            Rosto - Perfil
          </button>
          <button onClick={napeChoiced} className={nape ? styles.active : ""}>
            Nuca
          </button>
          <button
            onClick={bodyFrontChoiced}
            className={bodyFront ? styles.active : ""}
          >
            Corpo - Frente
          </button>
          <button
            onClick={bodySideChoiced}
            className={bodySide ? styles.active : ""}
          >
            Corpo - Perfil
          </button>
          <button
            onClick={bodyBackChoiced}
            className={bodyBack ? styles.active : ""}
          >
            Corpo - Costas
          </button>
        </div>

        <form onSubmit={handleUpload} className={styles.form}>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImagePreview(e.target.files[0])}
          />
          <button type="submit">Enviar</button>
          {formError && <p className="error">{formError}</p>}
        </form>
        {!imgURL && <progress value={progress} max="100" />}
        {success && <p className="success">Imagem enviada com sucesso!</p>}
      </div>

      <div className={styles.imagepreview}>
        {!imagePreview && <img src="./logo.png" alt="Imagem" />}
        {imagePreview && <img src={URL.createObjectURL(imagePreview)} alt="Foto escolhida" />}
      </div>
    </div>
  );
};

export default Images;
