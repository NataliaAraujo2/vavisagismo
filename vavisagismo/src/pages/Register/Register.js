import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom"


const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");



  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password,
      photoURL,
    };

    if (password !== confirmPassword) {
      setError("A senha e a confirmação da senha precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  
   navigate("/")
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
      console.log(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastro</h1>
      <p>Crie seu usuário e descubra-se!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label>
          <span>Confirmação de Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        {!loading && <button>Cadastrar</button>}
        {loading && <button disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
