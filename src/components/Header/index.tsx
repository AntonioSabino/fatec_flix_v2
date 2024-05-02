import "./Header.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo2.png.png";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <img src={logo} alt="logo" className="logo" />
          </li>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/favorites">Meus favoritos</Link>
          </li>
        </ul>
      </nav>
      <img
        className="user"
        src="https://cdn-icons-png.freepik.com/512/6915/6915987.png"
      />
    </header>
  );
}
