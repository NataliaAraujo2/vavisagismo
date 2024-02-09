import React from "react";
import photo from "../../images/foto.jpg";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <img src={photo} alt="Imagem" />
      <div className={styles.text}>
      <p>
        O início de minha vida na área da beleza é igual ao meu tempo de
        vida, sou filha de manicure, nasci e cresci dentro de salão, até tentei
        sair da área, mas acabei voltando.
      </p>
      <p>
        Iniciei minha vida profissional como auxiliar de cabeleireiro em grandes
        salões de São Paulo, e aos poucos fui me desenvolvendo e me
        profissionalizando, até conseguir o cargo de Cabeleireira Profissional.
      </p>
      <p>
        Em 2018 me formei em Estética e Cosmética – com ênfase em Estética
        Capilar e Visagismo pela Universidade Cruzeiro do Sul.
      </p>
      <p>
        Em 2022 concluí a Pós-graduação em Metodologia do Ensino Superior na
        Faculdade Uninter
      </p>
      <p>
        Atualmente sou Tutora do Curso de Estética e Cosmética na Faculdade
        Anhanguera e também consultora e instrutora técnica em salões, clínicas
        e escolas profissionalizantes na área da beleza.
      </p>
      <p>
        Participei de diversos cursos na área da beleza, em centros técnicos de
        marcas como Payot, Surya do Brasil, Keune, L’oreal, Vult, e por algumas
        academias como Hair School, Deva Curl e curso de aperfeiçoamento em
        Visagismo com Rute Vidal (fisignomia) e Paulo Persil - Visagismo e
        Penteados.
      </p>
      <p>
        Participo como voluntaria de ações do Outubro Rosa, com corte de cabelos
        para doação e confecção de perucas e Palestras Motivacionais para as
        Mulheres.
      </p>
      <p>
        Gosto muito de desenvolvimento pessoal e motivação, estou sempre
        buscando participar de cursos e whorkshops sobre o assunto, Participei
        de cursos como MBI (André Menezes), Inteligência Emocional – José
        Roberto Marques, Grafologia – Método Radaic, Eneagrama – Perfil de
        Personalidade, Constelações Sistêmicas, Master Practitioner em PNL –
        certificado reconhecido pela ABRATH, Aromaterapia.
      </p>
      </div>
    </div>
  );
};

export default About;
