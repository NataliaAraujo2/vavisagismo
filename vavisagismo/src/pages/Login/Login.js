import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user)

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
      console.log(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça login para ter acesso aos seus dados!</p>
      <form onSubmit={handleSubmit} >
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
          <span>Password:</span>
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

        {!loading && <button>Entrar</button>}
        {loading && <button disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
