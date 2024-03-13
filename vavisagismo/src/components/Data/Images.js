import React, { useEffect, useState } from "react";
import styles from "./Data.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import noImageUpload from "../../images/logo.png";
import { useQueries } from "../../hooks/useQueries";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Images = () => {
  //const uploads
  const [id, setId] = useState(null);
  const [imgURL, setImgURL] = useState(noImageUpload);
  const [imagePreview, setImagePreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [typeChoiced, setTypeChoiced] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { user } = useAuthValue();

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //const insert a new document
  const { insertDocument } = useInsertDocument("firstImages");

  // const Modify an existing document
  const { documents: firstImages } = useFetchDocuments("firstImages", user.uid);
  const { updateDocument } = useUpdateDocument("firstImages");

  //const photos
  const [faceFront, setFaceFront] = useState(false);
  const [faceSide, setFaceSide] = useState(false);
  const [nape, setNape] = useState(false);
  const [bodyFront, setBodyFront] = useState(false);
  const [bodySide, setBodySide] = useState(false);
  const [bodyBack, setBodyBack] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      const field = "uid";
      const demand = user.uid;
      await filterConclusion(field, demand);
    }

    loadData();

    if (firstImages) {
      for (var i = 0; i < firstImages.length; i++) {
        if (firstImages[i].typeChoiced === typeChoiced) {
          setId(firstImages[i].id);
          console.log(typeChoiced);
          console.log(firstImages[i].typeChoiced);
        }
      }
    }

    if (filteredConclusion) {
      setNoRender(true);
    }

    return () => {
      setCancelled(true);
    };
  }, [
    cancelled,
    filterConclusion,
    filteredConclusion,
    user.uid,
    firstImages,
    id,
    typeChoiced,
  ]);

  console.log(id);

  const faceFrontChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(true);
    setTypeChoiced("facefront");
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
  };

  const faceSideChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(false);
    setFaceSide(true);
    setTypeChoiced("faceSide");
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
  };

  const napeChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(false);
    setFaceSide(false);
    setNape(true);
    setTypeChoiced("nape");
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
  };

  const bodyFrontChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(true);
    setTypeChoiced("bodyFront");
    setBodySide(false);
    setBodyBack(false);
    setSuccess(false);
  };

  const bodySideChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(true);
    setTypeChoiced("bodySide");
    setBodyBack(false);
    setSuccess(false);
  };

  const bodyBackChoiced = (e) => {
    e.preventDefault();
    setId(null)
    setFaceFront(false);
    setFaceSide(false);
    setNape(false);
    setBodyFront(false);
    setBodySide(false);
    setBodyBack(true);
    setTypeChoiced("bodyBack");
    setSuccess(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setFormError("");
    setSuccess(false);

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
      `images/firstForm/${typeChoiced}/${user.uid}.`
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
            const data = {
              image: url,
            };
            if (id !== null) {
              updateDocument(id, data);
            }

            if (id === null) {
              insertDocument({
                typeChoiced,
                image: url,
                uid: user.uid,
              });
            }

            setImagePreview("");

            const imageInput = document.getElementById("image");
            imageInput.value = "";
            setImgURL(noImageUpload);
            setProgress(0);
            setId(null);
            setSuccess(true);
            setUploadLoading(false);
          } else {
            setFormError("Ocorreu um erro! Tente novamente mais tarde");
          }
        });
      }
    );
  };

  return (
    <div className={styles.images}>
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <>
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
              <button
                onClick={napeChoiced}
                className={nape ? styles.active : ""}
              >
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
              {!uploadLoading ? (
                <button>Enviar</button>
              ) : (
                <button disabled>Aguarde...</button>
              )}

              {imgURL === noImageUpload && (
                <progress value={progress} max="100" />
              )}
              {formError && <p className="error">{formError}</p>}
              {success && (
                <p className="success">Imagem enviada com sucesso!</p>
              )}
            </form>
          </div>

          <div className={styles.imagepreview}>
            {!imagePreview && <img src={imgURL} alt="Imagem" />}
            {imagePreview && (
              <img
                src={URL.createObjectURL(imagePreview)}
                alt="Foto escolhida"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Images;
