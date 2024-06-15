import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import MovieDetail from "./components/MovieDetail";
import FavoriteMovies from "./pages/FavoriteMovies";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/admin";
import { SignIn } from "./components/Signin";
import { SignUp } from "./components/Signup";
import LoadingBar from "react-top-loading-bar";

const AppRouter: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.username === "admin") {
      return (
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      );
    } else if (user && user.isLoggedIn) {
      return (
        <Routes>
          <Route
            path="/signin"
            element={<SignIn setProgress={setProgress} />}
          />
          <Route
            path="/signup"
            element={<SignUp setProgress={setProgress} />}
          />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home setProgress={setProgress} />} />
            <Route path="/home" element={<Home setProgress={setProgress} />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route
              path="/profile"
              element={<UserProfile setProgress={setProgress} />}
            />
            <Route
              path="/movie/:id"
              element={<MovieDetail setProgress={setProgress} />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route
            path="/signin"
            element={<SignIn setProgress={setProgress} />}
          />
          <Route
            path="/signup"
            element={<SignUp setProgress={setProgress} />}
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      );
    }
  };

  return (
    <Router>
      <LoadingBar
        color="#ffffff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {checkAuth()}
    </Router>
  );
};

export default AppRouter;
