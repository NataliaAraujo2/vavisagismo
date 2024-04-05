import React from "react";
import styles from "./Home.module.css";
import image from "../../images/2.png";

const Home = () => {
  const goWhatsApp = () => {
    window.open(`https://wa.me/5511987587322`, "blank");
  };

  return (
   
        <div className={styles.homeNoUser}>
          <img src={image} alt="Imagem Visagismo" />
          <div className={styles.text}>
            <div className={styles.text1}>
              <p>
                O Visagismo é a construção da identidade visual de um indivíduo,
                considerando as questões físicas, sociais, emocionais e
                profissionais, revelando o equilíbrio entre interno e externo de
                forma harmoniosa e sem máscaras.{" "}
              </p>
              <p>
                Ao utilizar de forma correta os recursos da coloração pessoal,
                corte de cabelo, maquiagens, estilo de roupas, você terá mais
                assertividades nas relações interpessoais.
              </p>

              <p>
                As indicações feitas na consultoria visagista é para evidenciar
                os pontos fortes trazendo autoconfiança, autoestima e
                principalmente uma comunicação visual segura.
              </p>
            </div>
            <div className={styles.text2}>
              <p>
                Você sabia que são necessárias 12 boas impressões para anular 1?
              </p>
              <p>
                Nosso cérebro demora somente 3 segundos para formar uma
                impressão visual sobre alguém, por essa razão a comunicação
                visual é tão importante.
              </p>
              <p>
                Mesmo não conhecendo o conceito de visagismo, a pessoa
                intuitivamente entende o significado das formas, linhas e cores,
                por isso que o outro, quando vê sua imagem tem sensações e
                emoções tão reativas, seja no trabalho, com a família ou até
                mesmo com pessoas desconhecidas.
              </p>
              <p>
                Para um visagista a moda importa pouco, o que realmente buscamos
                é o estilo de cada um baseado na individualidade, comportamento,
                estilo de vida e personalidade. A ideia é revelar a beleza
                interior através da sua imagem pessoal.
              </p>
              <p>
                É importante conhecer a diferença entre moda e estilo, Moda - é
                uma expressão do momento para um todo. Estilo - é uma expressão
                pessoal. A moda muda com frequência e o estilo tende a
                permanecer, raramente haverá mudanças.
              </p>
              <p>
                {" "}
                Nada que é de relação humana é engessado!!! Cada ser humano tem
                suas características únicas.
              </p>{" "}
              <p>Quer saber mais sobre a consultoria visagista? </p>
              <button onClick={goWhatsApp}>Entre em contato!</button>
            </div>
          </div>
        </div>
    
    
  );
};

export default Home;
