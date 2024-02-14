import React, { useState } from "react";
import styles from "./Data.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";

const Images = () => {
  //const uploads
  const [imgURL, setImgURL] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
    setTypeChoiced("facefront");
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
    setImgURL(null)
  };

  const faceSideChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(true);
    setTypeChoiced("faceSide");
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
    setImgURL(null)
  };

  const napeChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(true);
    setTypeChoiced("nape");
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
    setImgURL(null)
  };

  const bodyFrontChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(true);
    setTypeChoiced("bodyFront");
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
    setImgURL(null)
  };

  const bodySideChoiced = (e) => {
    e.preventDefault();
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(true);
    setTypeChoiced("bodySide");
    setBodyBack(false);
    setSuccess(false);
    setImgURL(null)
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
    setSuccess(false);
    setImgURL(null)
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (typeChoiced === "") {
      setFormError("Selecione de qual parte do corpo será a imagem enviada!");
      return;
    }

    const file = e.target[0]?.files[0];
    if (!file) {
      setFormError("Selecione uma imagem");
      return;
    }

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
          if (url) {
            setSuccess(true);
            setImagePreview("");
            const imageInput = document.getElementById("image");
            imageInput.value = "";
            setImgURL(null)
          } else {
            setFormError("Ocorreu um erro! Tente novamente mais tarde");
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
          {!imgURL && <progress value={progress} max="100" />}
          {formError && <p className="error">{formError}</p>}
          {success && <p className="success">Imagem enviada com sucesso!</p>}
        </form>
      </div>

      <div className={styles.imagepreview}>
        {!imagePreview && <img src="./logo.png" alt="Imagem" />}
        {imagePreview && (
          <img src={URL.createObjectURL(imagePreview)} alt="Foto escolhida" />
        )}
      </div>
    </div>
  );
};

export default Images;
