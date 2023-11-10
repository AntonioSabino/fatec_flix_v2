import { Movie } from '../../interfaces/movie.interface'
import './MovieList.css'

export default function MovieList({ movies }: { movies: Movie[] }) {
	return (
		<div className='movie-list-container'>
			<div className='movie-list'>
				{movies.map((movie: Movie) => (
					<div
						className='movie'
						key={movie.title}
					>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt='${movie.title}'
						/>
						<div className='movie-info'>
							<h3 className='movie-title'>{movie.title}</h3>
							<span className='movie-vote'>{movie.vote_average}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
