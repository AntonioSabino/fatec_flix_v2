import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie, MovieLink } from '../../interfaces/movie.interface'
import { fetchMovieDetails, fetchMovieWatchProviders } from '../../utils/api'
import './MovieDetail.css'

const MovieDetail = () => {
	const { id } = useParams()

	const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie)
	const [providers, setProviders] = useState<MovieLink>({} as MovieLink)
	const [isInFavorites, setIsInFavorites] = useState(false)

	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetchMovieDetails(Number(id))
			setMovieDetails(movie)
			const providers = await fetchMovieWatchProviders(Number(id))
			setProviders(providers)
		}

		fetchMovie().catch(console.error)
	}, [id])

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		setIsInFavorites(favorites.some((fav: Movie) => fav.id === movieDetails.id))
	}, [movieDetails.id])

	const handleAddToFavorites = () => {
		const user = JSON.parse(localStorage.getItem('user') || '{}')
		if (user.isLoggedIn) {
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

			if (!isInFavorites) {
				favorites.push(movieDetails)

				localStorage.setItem('favorites', JSON.stringify(favorites))
			} else {
				console.log('O filme já está na lista de favoritos.')
				handleRemoveFromFavorites()
			}

			// Atualiza o estado de isInFavorites
			setIsInFavorites(!isInFavorites)
		} else {
			console.log('O usuário não está logado.')
		}
	}

	const handleRemoveFromFavorites = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		const updatedFavorites = favorites.filter(
			(fav: Movie) => fav.id !== movieDetails.id
		)

		localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

		console.log('Filme removido dos favoritos.')

		// Atualiza o estado de isInFavorites
		setIsInFavorites(!isInFavorites)
	}

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
					{isInFavorites ? (
						<button
							onClick={handleRemoveFromFavorites}
							className='remove-from-favorites'
						>
							Remover dos Favoritos
						</button>
					) : (
						<button
							onClick={handleAddToFavorites}
							className='add-to-favorites'
						>
							Adicionar aos Favoritos
						</button>
					)}
					<div className='providers-info'>
						<h3>Stream</h3>
						<ul>
							{providers?.flatrate?.map((provider) => (
								<li key={provider.provider_id}>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
						<h3>Alugar</h3>
						<ul>
							{providers?.rent?.map((provider) => (
								<li key={provider.provider_id}>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
						<h3>Comprar</h3>
						<ul>
							{providers?.buy?.map((provider) => (
								<li key={provider.provider_id}>
									<img
										src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
										alt={`${provider.provider_name} logo`}
										className='provider-logo'
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	} else {
		return <div>Loading...</div>
	}
}

export default MovieDetail
