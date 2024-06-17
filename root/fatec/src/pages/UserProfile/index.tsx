// ProfilePage.tsx
import { useEffect, useState } from "react";
import FavoriteMovies from "../FavoriteMovies";
import "./UserProfile.css";
import UserSocials from "../../components/UserSocials";

const UserProfile = () => {
  const[userId , setUserId] = useState(0)
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userInstagram, setUserInstagram] = useState("");
  const [userFacebook, setUserFacebook] = useState("");
  const [userTwitter, setUserTwitter] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.username) {
      setUserId(user.id)
      setUsername(user.username);
      setUserEmail(user.user_email);
      setUserInstagram(user.instagram);
      setUserFacebook(user.facebook);
      setUserTwitter(user.twitter);
    }
  }, []);

  const handleSalvar = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        id: userId,
        user_name: username,
        email: userEmail,
        instagram: userInstagram,
        facebook: userFacebook,
        twitter: userTwitter
      }),
    };

    fetch("http://localhost:8080/fatec/api/editar_usuario.php", myInit)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] && data[0].user_name === username) {
          const user = {
            id : data[0].id,
            username: data[0].user_name,
            user_email: data[0].email,
            instagram: data[0].instagram? data[0].instagram : "",
            facebook: data[0].facebook? data[0].facebook : "",
            twitter: data[0].twitter? data[0].twitter : "",
            isLoggedIn: true,
          };
          localStorage.setItem('user', JSON.stringify(user))
        }
      });
  };

  const handleFocus = () => {
    setIsButtonVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsButtonVisible(false);
    });
  };

  return (
    <div className="user-profile-container">
      <div className="user-info-header">
        <div className="user-info-surface">
          <div className="user-info-container">
            <img
              className="user-pfp"
              src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
              alt=""
            />
            <h1>
              {username.length > 10
                ? username.substring(0, 10) + "..."
                : username}
            </h1>
            <button
              className="button-edit"
              onClick={() => {
                setIsEditVisible(!isEditVisible);
              }}
            >
              Editar
            </button>
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "end",
            }}
          >
            <textarea
              className="text-area"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Escreva algo sobre você..."
            ></textarea>
            {isButtonVisible && (
              <button className="button-salvar">Salvar</button>
            )}
          </div>
          <div className="user-socials">
            <h2>Redes Sociais</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <UserSocials
                hrefLink="https://instagram.com"
                imageLink="https://cdn-icons-png.flaticon.com/24/2111/2111463.png"
                title="Instagram"
                hex="E1306C"
              />
              <UserSocials
                hrefLink="https://facebook.com"
                imageLink="https://cdn-icons-png.flaticon.com/24/2111/2111398.png"
                title="Facebook"
                hex="3B5998"
              />
              <UserSocials
                hrefLink="https://twitter.com"
                imageLink="https://cdn-icons-png.flaticon.com/24/3256/3256013.png"
                title="Twitter"
                hex="1DA1F2"
              />
            </ul>
          </div>
        </div>
      </div>
      <div
        className="user-edit-surface"
        style={{ display: isEditVisible ? "flex" : "none" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2>Editar:</h2>
          <div className="user-edit-container">
            <div className="user-edit-input">
              <p>Nome de Usuário:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />
            </div>
            <div className="user-edit-input">
              <p>Email:</p>
              <input
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                {...(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userEmail)
                  ? {}
                  : { style: { borderColor: "red", border: "2px, solid" } })}
                name="email"
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2>Redes Sociais: (Link)</h2>
          <div className="user-edit-container">
            <div className="user-edit-input">
              <p>Instagram:</p>
              <input
                type="text"
                value={userInstagram}
                onChange={(e) => setUserInstagram(e.target.value)}

              />
            </div>
            <div className="user-edit-input">
              <p>Facebook:</p>
              <input
                type="text"
                value={userFacebook}
                onChange={(e) => setUserFacebook(e.target.value)}
              />
            </div>
            <div className="user-edit-input">
              <p>Twitter:</p>
              <input
                type="text"
                value={userTwitter}
                onChange={(e) => setUserTwitter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          className="button-salvar"
          onClick={() => {
            handleSalvar();
            setIsEditVisible(false);
          }}
        >
          Salvar
        </button>
      </div>
      <FavoriteMovies />
    </div>
  );
};

export default UserProfile;
