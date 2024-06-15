import { Link } from "react-router-dom";
import { Movie } from "../../interfaces/movie.interface";
import "./MovieList.css";
import { FC } from "react";

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: FC<MovieListProps> = (props) => {
  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">{props.title}</h2>

      <div className="movie-list">
        {props.movies.map((movie: Movie) => (
          <Link to={`/movie/${movie.id}`} className="movie" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              {/* <span className="movie-vote">
                {movie.vote_average.toFixed(2)}
              </span> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
