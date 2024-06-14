import { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Signin.css";

interface LoggedUser {
  user_name: string | null;
}

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState<LoggedUser[]>([]);

  const navigate = useNavigate();

  const handleSignIn = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        user_email: username,
        password,
      }),
    };

    fetch("http://localhost:8080/fatec/api/login.php", myInit)
      .then((response) => response.json())
      .then((data) => {
        setLoggedUser(data);
      });

    if (loggedUser[0] && loggedUser[0].user_name === username) {
      const user = { username, isLoggedIn: true };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } else {
      alert("Login inválido!");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="form-signin-container">
        
          <h1>Bem vindo 👋</h1>
          
        
        <form className="form-signin" method="POST">
          <label className="form-label-signin">
            Usuário:
            <input
              className="form-input-signin"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email ou nome de Usuário."
              name="user_email"
              id="user_email"
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
              placeholder="Digite a sua senha."
              name="password"
              id="password"
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

      <div
        className="poster-container"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg)`,
        }}
      >
        <img src="https://www.themoviedb.org/t/p/w1280/kO6K9zEsKhNyqcrdGTSqAI6jrie.jpg" />
      </div>
    </div>
  );
}
