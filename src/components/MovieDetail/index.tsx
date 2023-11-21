// Importe as dependências necessárias
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie } from '../../interfaces/movie.interface'
import { fetchMovieDetails } from '../../utils/api'

// Defina o componente MovieDetail
const MovieDetail = () => {
	const { id } = useParams()

	const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie)

	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetchMovieDetails(Number(id))
			setMovieDetails(movie)
		}

		fetchMovie().catch(console.error)
	}, [id])

	if (movieDetails) {
		return (
			<div className='movie-detail-container'>
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
					alt={movieDetails.title}
				/>
				<div className='movie-detail-info'>
					<h2>{movieDetails.title}</h2>
					<p>{movieDetails.overview}</p>
					<p>Release Date: {movieDetails.release_date}</p>
					<p>Vote Average: {movieDetails.vote_average}</p>
					{/* Adicione mais detalhes conforme necessário */}
				</div>
			</div>
		)
	} else {
		// Se os detalhes do filme ainda estiverem sendo carregados, você pode exibir uma mensagem de carregamento ou redirecionar para uma página de erro.
		return <div>Loading...</div>
	}
}

export default MovieDetail
