import React, { useEffect, useRef, useState } from "react";
import styles from "./Data.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const PersonalStyle = () => {
  //form const
  const [color, setColor] = useState("");
  const [detailsStyle, setDetailsStyle] = useState("");
  const [accessories, setAccessories] = useState("");
  const [style, setStyle] = useState("");
  const [seasons, setSeasons] = useState("");
  const [shoes, setShoes] = useState("");
  const [makeup, setMakeup] = useState("");

  //ref focus
  const colorRef = useRef(null);
  const detailsStyleRef = useRef(null);
  const accessoriesRef = useRef(null);
  const styleRef = useRef(null);
  const seasonsRef = useRef(null);
  const shoesRef = useRef(null);
  const makeupRef = useRef(null);

  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuthValue();

  //const no render
  const { filter: filterConclusion, document: filteredConclusion } =
    useQueries("conclusion");
  const [noRender, setNoRender] = useState(false);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //const insert a new document
  const { insertDocument, response, error } =
    useInsertDocument("personalstyle");

  // const Modify an existing document
  const { documents: personalstyle } = useFetchDocuments(
    "personalstyle",
    user.uid
  );
  const { updateDocument } = useUpdateDocument("personalstyle");

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      const field = "uid";
      const demand = user.uid;
      await filterConclusion(field, demand);
    }

    loadData();

    if (filteredConclusion) {
      setNoRender(true);
    }

    return () => {
      setCancelled(true);
    };
  }, [cancelled, filterConclusion, filteredConclusion, user.uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!color) {
      setFormError("Qual cor prefere? Resposta obrigatória!");
      colorRef.current.focus();
      return;
    }

    if (!detailsStyle) {
      setFormError(
        "Gosta de brilho, transparências, decotes, fendas? Resposta obrigatória!"
      );
      detailsStyleRef.current.focus();
      return;
    }

    if (!accessories) {
      setFormError("Usa acessórios? Quais mais gosta? Resposta obrigatória!");
      accessoriesRef.current.focus();
      return;
    }

    if (!seasons) {
      setFormError(
        "Prefere se vestir no verão ou no inverno? Explique o porquê. Resposta obrigatória!"
      );
      seasonsRef.current.focus();
      return;
    }
    if (!shoes) {
      setFormError("Prefere tênis ou salto? Resposta obrigatória!");
      shoesRef.current.focus();
      return;
    }
    if (!makeup) {
      setFormError(
        "Usa maquiagem com frequência ou está sempre sem? Resposta obrigatória!"
      );
      makeupRef.current.focus();
      return;
    }

    if (!style) {
      setFormError("Como você classificaria seu estilo? Resposta obrigatória!");
      styleRef.current.focus();
      return;
    }

    if (error) {
      return;
    }

    const data = {
      color,
      detailsStyle,
      accessories,
      style,
      seasons,
      shoes,
      makeup,
    };

    if (personalstyle) {
      for (var i = 0; i < personalstyle.length; i++) {
        if (personalstyle[i].uid === user.uid) {
          updateDocument(personalstyle[i].id, data);
        }
      }
    }

    if (personalstyle.length === 0) {
      insertDocument({
        uid: user.uid,
        color,
        detailsStyle,
        accessories,
        style,
        seasons,
        shoes,
        makeup,
      });
  
    }


    setSuccess(true);
    setColor("");
    setDetailsStyle("");
    setAccessories("");
    setStyle("");
    setSeasons("");
    setShoes("");
    setMakeup("");
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <div>
      {noRender ? (
        <div className="danger"> FORMULÁRIO JÁ RESPONDIDO</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              <span>Qual cor prefere?</span>
              <textarea
                name="color"
                placeholder=""
                value={color}
                onChange={(e) => setColor(e.target.value)}
                ref={colorRef}
              />
            </label>
            <label>
              <span>Gosta de brilho, transparências, decotes, fendas?</span>
              <textarea
                name="detailsStyle"
                placeholder=""
                value={detailsStyle}
                onChange={(e) => setDetailsStyle(e.target.value)}
                ref={detailsStyleRef}
              />
            </label>
            <label>
              <span>Usa acessórios? Quais mais gosta?</span>
              <textarea
                name="accessories"
                placeholder=""
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
                ref={accessoriesRef}
              />
            </label>
            <label>
              <span>
                Prefere se vestir no verão ou no inverno? Explique o porquê.
              </span>
              <textarea
                name="seasons"
                placeholder=""
                value={seasons}
                onChange={(e) => setSeasons(e.target.value)}
                ref={seasonsRef}
              />
            </label>
            <label>
              <span>Prefere tênis ou salto?</span>
              <textarea
                name="shoes"
                placeholder=""
                value={shoes}
                onChange={(e) => setShoes(e.target.value)}
                ref={shoesRef}
              />
            </label>
            <label>
              <span>Usa maquiagem com frequência ou está sempre sem?</span>
              <textarea
                name="makeup"
                placeholder=""
                value={makeup}
                onChange={(e) => setMakeup(e.target.value)}
                ref={makeupRef}
              />
            </label>
            <label>
              <span>Como você classificaria seu estilo?</span>
              <textarea
                name="style"
                placeholder=""
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                ref={styleRef}
              />
            </label>

            {!response.loading && <button>Enviar</button>}
            {response.loading && <button disabled>Aguarde...</button>}
            {formError && <p className="error">{formError}</p>}
            {response.error ? (
              <p className="error">{response.error}</p>
            ) : (
              !response.loading &&
              success && (
                <p className="success">Respostas enviadas com sucesso!</p>
              )
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default PersonalStyle;
