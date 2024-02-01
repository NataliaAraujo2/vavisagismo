import React from 'react'
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.home}>
        <h1>Seja Bem Vindo!</h1>
        <p>Faça seu cadastro ou login para acessar a sua página!</p>
    </div>
  )
}

export default Home