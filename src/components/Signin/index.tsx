import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Signin.css";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
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

    try {
        const response = await fetch("http://localhost:8080/fatec/api/login.php", myInit);
        if (!response.ok) {
            throw new Error("Login inválido!");
        }

        const data = await response.json();

        const user = {
            id: data.id,
            username: data.user_name,
            user_email: data.user_email,
            isLoggedIn: true,
        };

        // Armazena o usuário no localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Armazena os favoritos como um array de objetos JSON no localStorage
        if (Array.isArray(data.favorites)) {
            localStorage.setItem("favorites", JSON.stringify(data.favorites));
        } else {
            localStorage.setItem("favorites", "[]"); // Caso não existam favoritos, armazena um array vazio
        }

        window.location.reload(); // Recarrega a página para refletir o estado de login
    } catch (error) {
        alert("Erro ao fazer login");
    }
};




  const navigateToSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [navigate])

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
