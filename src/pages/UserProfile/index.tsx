// ProfilePage.tsx
import { useEffect, useState } from "react";
import FavoriteMovies from "../FavoriteMovies";
import "./UserProfile.css";
import UserSocials from "../../components/UserSocials";

const UserProfile = ({ setProgress }: { setProgress: React.Dispatch<React.SetStateAction<number>> }) => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(80);
    }, 500);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.username) {
      setUsername(user.username);
      setUserEmail(user.user_email);
    }
  }, []);


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
            <p>{userEmail}</p>
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
            <ul style={{display: "flex", flexDirection:"column", gap: 8}}>
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
      <FavoriteMovies />
    </div>
    
  );
};

export default UserProfile;
