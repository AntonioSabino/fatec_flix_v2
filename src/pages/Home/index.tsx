import "./Home.css";

import { apiUrls, fetchMovieData, searchMovies } from "../../utils/api";
import { useEffect, useState } from "react";
import MovieBanner from "../../components/MovieBanner";
import MovieList from "../../components/MovieList";
import { Movie } from "../../interfaces/movie.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Navigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import MovieRowList from "../../components/MovieRowList";

function Home() {
  const isLogged = localStorage.getItem("user");

  const [category, setCategory] = useState<string>("trendingMovies");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const searchResults = await searchMovies(query);
    setMovies(searchResults);
    setBannerMovies(searchResults.slice(0, 5));
    setCategory("");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await fetchMovieData(category);
      setMovies(moviesData);

      const nowPlayingMoviesData = await fetchMovieData("nowPlayingMovies");
      setNowPlayingMovies(nowPlayingMoviesData.slice(0, 10));

      const topRatedMoviesData = await fetchMovieData("topRatedMovies");
      setTopRatedMovies(topRatedMoviesData.slice(0, 10));

      setBannerMovies(moviesData.slice(0, 5));
    };

    fetchMovies().catch(console.error);
  }, [category]);

  if (!isLogged) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      <MovieBanner movies={bannerMovies} />
      <Swiper
        slidesPerView={8}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="swiper-categories"
      >
        {Object.entries(apiUrls).map(([key, { title }]) => (
          <SwiperSlide
            className="slide-category"
            key={key}
            onClick={() => setCategory(key)}
          >
            {title}
          </SwiperSlide>
        ))}
      </Swiper>

      <MovieRowList title="Em alta" movies={topRatedMovies} />
      <MovieRowList title="Recentes" movies={nowPlayingMovies} />
      <MovieList movies={movies} />
    </div>
  );
}

export default Home;
