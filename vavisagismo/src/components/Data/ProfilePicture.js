import React, { useEffect, useState } from "react";
import styles from "./Data.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import { useQueries } from "../../hooks/useQueries";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useParams } from "react-router-dom";

const ProfilePicture = () => {
  //const uploads
  const [cancelled, setCancelled] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const [success, setSuccess] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("./logo.png");
  const { filter, document: filteredUser } = useQueries("users");
  const { updateDocument } = useUpdateDocument("users");
  const {id} =useParams()

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      try {
        const field = "uid";
        const demand = user.uid;
        await filter(field, demand);
      } catch (error) {
        console.log(error);
      }
    }


    loadData();

    return () => setCancelled(true);
  }, [cancelled, filter, user, filteredUser]);

  const handleUpload = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files[0];
    if (!file) {
      setFormError("Selecione uma imagem");
      return;
    }

    const storageRef = ref(storage, `images/profilepicture/${user.uid}`);

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
            updateProfile(user, { photoURL: url });
           
            const data = {
              profilePicture: url,
            };

         
            updateDocument(id, data);

            setSuccess(true);
            setImagePreview("");
            const imageInput = document.getElementById("image");
            imageInput.value = "";
            setImgURL(null);
            console.log(url);
          } else {
            setFormError("Ocorreu um erro! Tente novamente mais tarde");
          }
        });
      }
    );
  };

  useEffect(() => {
    
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
      
    } else {
      setPhotoUrl("https://firebasestorage.googleapis.com/v0/b/vmavisagismo.appspot.com/o/logobremoved.png?alt=media&token=e259ce3f-06bd-4e9a-9429-3e1a85a3eb99")
    }
  }, [user, photoUrl]);

  return (
    <div className={styles.profilepicture}>
      <h2>Adicione uma foto para o seu cadastro!</h2>

      <div className={styles.profilePictureAvatar}>
        {!imagePreview && (
          <img src={photoUrl} alt="Imagem" className={styles.avatar} />
        )}
        {imagePreview && (
          <img
            src={URL.createObjectURL(imagePreview)}
            alt="Foto escolhida"
            className={styles.avatar}
          />
        )}
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
  );
};

export default ProfilePicture;
