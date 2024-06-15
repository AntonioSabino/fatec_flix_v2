import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Movie, Genre } from "../../interfaces/movie.interface";
import "./MovieBanner.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { fetchGenres } from "../../utils/api";

export default function MovieBanner({ movies }: { movies: Movie[] }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenre();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={{enabled: true}}

        className="movie-banner-swiper"
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {genres.length > 0 &&
          movies.map((movie: Movie) => (
            <SwiperSlide
              className="movie-banner"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
              }}
              key={movie.title}
            >
              <Link to={`/movie/${movie.id}`} className="movie" key={movie.id}>
                <section className="movie-banner-details">
                  <h1 className="movie-banner-title">
                    {movie.title.length > 20
                      ? movie.title.substring(0, 20) + "..."
                      : movie.title}
                  </h1>
                  <span className="movie-banner-small-details">
                    <span className="movie-banner-small-details-rating">

                    <img src="https://cdn-icons-png.flaticon.com/128/9715/9715468.png" alt="" />
                    <h4>{movie.vote_average.toFixed(2)}</h4>
                    </span>
                    <h4>{movie.release_date.substring(0,4)}</h4>

                    {movie.genre_ids.map((genreId) => {
                      const foundGenre = genres.find((g) => g.id === genreId);
                      return foundGenre ? (
                        <h4 key={foundGenre.id}>{foundGenre.name}</h4>
                      ) : null;
                    })}
                  </span>
                  <h2 className="movie-banner-overview">
                    {movie.overview.length > 200
                      ? movie.overview.substring(0, 150) + "[...]"
                      : movie.overview}
                  </h2>
                </section>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
