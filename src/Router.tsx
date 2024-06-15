import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './layouts/DefaultLayout';
import MovieDetail from './components/MovieDetail';
import FavoriteMovies from './pages/FavoriteMovies';
import UserProfile from './pages/UserProfile';
import { SignIn } from './components/Signin';
import { SignUp } from './components/Signup'; 

const AppRouter: React.FC = () => {


  const checkAuth = () => {
  
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (user && user.isLoggedIn) {
      return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} /> {/* Redireciona qualquer outra rota para /signin */}
        </Routes>
      );
    }
  };

  return (
    <Router>
      {checkAuth()}
    </Router>
  );
};

export default AppRouter;
