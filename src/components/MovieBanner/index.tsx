import { Movie } from '../../interfaces/movie.interface'
import './MovieBanner.css'

export default function MovieBanner({ movies }: { movies: Movie[] }) {
	return (
		<>
			{movies.map((movie: Movie) => (
				<div
					className='movie-banner'
					style={{
						backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`,
					}}
					key={movie.title}
				>
					<h2 className='movie-banner-title'>{movie.title}</h2>
				</div>
			))}
		</>
	)
}
