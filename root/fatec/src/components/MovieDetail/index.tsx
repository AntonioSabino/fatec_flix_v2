import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Movie, MovieLink } from '../../interfaces/movie.interface'
import { fetchMovieDetails, fetchMovieWatchProviders } from '../../utils/api'
import './MovieDetail.css'
import Comments from './Comments'
import CommentFormModal from './CommentFormModal'

export interface Comment {
	id: number
	rating: number
	comment: string
	user_name: string
}

const MovieDetail = () => {
	const { id } = useParams()

	const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie)
	const [providers, setProviders] = useState<MovieLink>({} as MovieLink)
	const [isInFavorites, setIsInFavorites] = useState(false)
	const [comments, setComments] = useState<Comment[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [favorites, setFavorites] = useState([] as number[])

	const user = JSON.parse(localStorage.getItem('user') || '{}')

	const links = [
		{
			provider_id: 119,
			movie_id: 603692,
			link: 'https://www.primevideo.com/-/pt/detail/0OPU861X5ZA4ETQFV906HPCQ1T/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 119,
			movie_id: 245891,
			link: 'https://www.primevideo.com/-/pt/detail/0QSV36C6S10IZ3NOZILJ71VZ9C/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 245891,
			link: 'https://globoplay.globo.com/john-wick-de-volta-ao-jogo/t/xjjRq58GYJ/',
		},
		{
			provider_id: 484,
			movie_id: 245891,
			link: 'https://www.clarotvmais.com.br/filme/john-wick-de-volta-ao-jogo/2537669',
		},
		{
			provider_id: 227,
			movie_id: 245891,
			link: 'https://www.telecine.com.br/',
		},
		{
			provider_id: 119,
			movie_id: 324552,
			link: 'https://www.primevideo.com/-/pt/detail/0IUK3B812OE0SHGE6669S2F27R/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 324552,
			link: 'https://globoplay.globo.com/john-wick-um-novo-dia-para-matar/t/9sxcgDQCKP/',
		},
		{
			provider_id: 119,
			movie_id: 458156,
			link: 'https://www.primevideo.com/-/pt/detail/0O733T1H6OITZW94X3B2NU9HNN/ref=atv_dl_rdr?tag=justbrrsjd-20',
		},
		{
			provider_id: 307,
			movie_id: 458156,
			link: 'https://globoplay.globo.com/john-wick-3-parabellum/t/NNRjmsDsT1/',
		},
		{
			provider_id: 227,
			movie_id: 458156,
			link: 'https://www.telecine.com.br/',
		},
	]

	const fetchComments = () => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		fetch(
			`http://localhost:8080/fatec/api/listar_comentarios.php?movie_id=${id}`,
			{
				method: 'GET',
				headers: myHeaders,
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setComments(data)
			})
	}

	useEffect(() => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'GET',
			headers: myHeaders,
		}

		const movieId = Number(id)

		fetch(
			`http://localhost:8080/fatec/api/listar_comentarios.php?movie_id=${movieId}`,
			myInit
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setComments(data)
			})
	}, [id])

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
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		const myInit = {
			method: 'GET',
			headers: myHeaders,
		}

		fetch(
			`http://localhost:8080/fatec/api/listar_favoritos.php?user_name=${user.username}`,
			myInit
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setFavorites(data)
			})
	}, [user.username])

	useEffect(() => {
		console.log(favorites.length)

		const isInFavorites = favorites.some((fav) => fav == Number(id))

		console.log(isInFavorites)

		setIsInFavorites(isInFavorites)
	}, [favorites, id])

	const handleAddToFavorites = () => {
		if (user.isLoggedIn) {
			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/json')

			const myInit = {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify({
					user_name: user.username,
					movie_id: Number(id),
				}),
			}

			fetch('http://localhost:8080/fatec/api/adicionar_favorito.php', myInit)
				.then(() => {
					setIsInFavorites(true)
				})
				.catch((error) => {
					console.error('Error adding favorite:', error)
					alert('Erro ao tentar adicionar filme aos favoritos.')
				})

			const updatedFavorites = [...favorites, Number(id)]

			setFavorites(updatedFavorites)
		} else {
			console.log('O usuário não está logado.')
		}
	}

	const handleRemoveFromFavorites = () => {
		if (user.isLoggedIn) {
			const myHeaders = new Headers()
			myHeaders.append('Content-Type', 'application/json')

			const myInit = {
				method: 'DELETE',
				headers: myHeaders,
				body: JSON.stringify({
					user_name: user.username,
					movie_id: Number(id),
				}),
			}

			fetch('http://localhost:8080/fatec/api/remover_favorito.php', myInit)
				.then(() => {
					setIsInFavorites(false)
				})
				.catch((error) => {
					console.error('Error removing favorite:', error)
					alert('Erro ao tentar remover filme dos favoritos.')
				})

			const updatedFavorites = favorites.filter((fav) => fav !== Number(id))

			setFavorites(updatedFavorites)
		} else {
			console.log('O usuário não está logado.')
		}
	}

	const findLink = (providerId: number, movieId: number) => {
		const linkObj = links.find(
			(link) => link.provider_id === providerId && link.movie_id === movieId
		)
		return linkObj ? linkObj.link : '#'
	}

	if (movieDetails) {
		return (
			<>
				<div
					className='movie-detail-backdrop'
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
					}}
				></div>
				<div
					className='movie-detail-container'
					style={{}}
				>
					<img
						className='movie-detail-poster'
						src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
						alt={movieDetails.title}
					/>
					<div className='movie-detail-info'>
						<h1>{movieDetails.title}</h1>
						<p>{movieDetails.overview}</p>

						<span className='movie-detail-info2'>
							<span>
								<p>Avaliação: </p>
								<p>
									{movieDetails.vote_average
										? movieDetails.vote_average.toFixed(2)
										: ''}
								</p>
								<img
									className='movie-icon-small-details'
									src='https://cdn-icons-png.flaticon.com/128/9715/9715468.png'
									alt=''
								/>
							</span>
							<span>
								<p>Data de lançamento: </p>
								<p>
									{movieDetails.release_date
										? movieDetails.release_date.substring(0, 4)
										: ''}
								</p>
							</span>
						</span>

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
							<h3>Streaming</h3>
							<ul>
								{providers?.flatrate?.length === undefined ? (
									<li>Não disponível</li>
								) : (
									providers?.flatrate?.map((provider) => (
										<li
											key={provider.provider_id}
											onClick={() =>
												window.open(
													findLink(provider.provider_id, movieDetails.id),
													'_blank'
												)
											}
											id={provider.provider_id.toString()}
										>
											<img
												src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
												alt={`${provider.provider_name} logo`}
												className='provider-logo'
											/>
										</li>
									))
								)}
							</ul>
							<h3>Alugar</h3>
							<ul>
								{providers?.rent?.length === undefined ? (
									<li>Não disponível</li>
								) : (
									providers?.rent?.map((provider) => (
										<li key={provider.provider_id}>
											<img
												src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
												alt={`${provider.provider_name} logo`}
												className='provider-logo'
											/>
										</li>
									))
								)}
							</ul>
							<h3>Comprar</h3>
							<ul>
								{providers?.buy?.length === undefined ? (
									<li>Não disponível</li>
								) : (
									providers?.buy?.map((provider) => (
										<li key={provider.provider_id}>
											<img
												src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
												alt={`${provider.provider_name} logo`}
												className='provider-logo'
											/>
										</li>
									))
								)}
							</ul>
						</div>
					</div>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className='add-comment-button'
				>
					Adicionar Comentário
				</button>

				<CommentFormModal
					movieId={Number(id)}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onCommentAdded={() => fetchComments()}
				/>
				<Comments comments={comments} />
			</>
		)
	} else {
		return <div>Loading...</div>
	}
}

export default MovieDetail
