import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Signin.css";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const isValidUser = storedUsers.some(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (isValidUser) {
      const user = { username, isLoggedIn: true };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } else {
      alert("Nome ou senha inválidos.");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="form-signin-container">
        <div>
          <h1>Bem vindo 👋</h1>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </h4>
        </div>
        <form className="form-signin">
          <label className="form-label-signin">
            Usuário:
            <input
              className="form-input-signin"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Exemplo"
            />
          </label>
          <br />
          <label className="form-label-signin">
            Senha:
            <input
              className="form-input-signin"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Pelo menos 8 caracteres"
            />
          </label>
          <br />
          <button
            className="form-button-signin"
            type="button"
            onClick={handleSignIn}
          >
            Entrar
          </button>
        </form>
        <p className="signup-text">
          Não tem uma conta?{" "}
          <span className="signup-link" onClick={navigateToSignUp}>
            Cadastrar
          </span>
        </p>
      </div>
      <div className="poster-container">
        <div
          className="poster-signin"
          style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg)`,
          }}
        ></div>
      </div>
    </div>
  );
}
