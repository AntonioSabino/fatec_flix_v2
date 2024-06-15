import "./Home.css";

import { apiUrls, fetchMovieData, searchMovies } from "../../utils/api";
import { useEffect, useState } from "react";
import MovieBanner from "../../components/MovieBanner";
import MovieList from "../../components/MovieList";
import { Movie } from "../../interfaces/movie.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import { Navigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import MovieRowList from "../../components/MovieRowList";

function Home() {
  const isLogged = localStorage.getItem("user");

  const [category, setCategory] = useState<string>("trendingMovies");
  const [movieListTitle, setMovieListTitle] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [bannerMovies, setBannerMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const searchResults = await searchMovies(query);
    setMovies(searchResults);
    setBannerMovies(searchResults.slice(0, 10));
    setMovieListTitle(query);
    setCategory("");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await fetchMovieData(category);
      setMovies(moviesData);

      const nowPlayingMoviesData = await fetchMovieData("nowPlayingMovies");
      setNowPlayingMovies(nowPlayingMoviesData);

      const topRatedMoviesData = await fetchMovieData("topRatedMovies");
      setTopRatedMovies(topRatedMoviesData);

      setBannerMovies(moviesData.slice(0, 10));
    };

    fetchMovies().catch(console.error);
  }, [category]);

  if (!isLogged) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />

      {!movies ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          {category === "trendingMovies" ? (
            <MovieBanner movies={bannerMovies} />
          ) : (
            <div></div>
          )}

          {category === "trendingMovies" ? (
            <Swiper
              slidesPerView={8}
              scrollbar={{
                hide: false,
                draggable: true,
                snapOnRelease: true,
              }}
              modules={[Pagination, Scrollbar]}
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
          ) : (
            <div></div>
          )}

          {category === "trendingMovies" ? (
            <>
              <MovieRowList title="Em alta" movies={topRatedMovies} />
              <MovieRowList title="Recentes" movies={nowPlayingMovies} />
            </>
          ) : (
            <div></div>
          )}
          <MovieList
            movies={movies}
            title={
              movieListTitle || apiUrls[category].title
            }
          />
        </>
      )}
    </div>
  );
}

export default Home;
