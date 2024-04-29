import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Movie } from "../../interfaces/movie.interface";
import { Link } from 'react-router-dom'
import './MovieRowList.css'
import { FC } from "react";

interface MovieRowListProps {
  title: string;
  movies: Movie[];
}

const MovieRowList:FC<MovieRowListProps> = (props) => {
  return (
    <div className="movie-row-container">
      
      <h2 className="movie-row-category">{props.title}</h2>
      <hr className="solid"></hr>
      <Swiper
        slidesPerView={7}
        spaceBetween={20}
        modules={[Pagination]}
        loop={true}
        className="swiper-movies"
      >
        {props.movies.map((movies: Movie) => (
          <SwiperSlide className="movie-cards">
            <Link
          to={`/movie/${movies.id}`}
          className='movie'
          key={movies.id}
        >
            <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt=""
              />
            <h3 className="movie-cards-title">{movies.title}</h3>
              </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieRowList;
