import './FavoriteMovies.css'

import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList'
import { Movie } from '../../interfaces/movie.interface'

import { Navigate } from 'react-router-dom'
import { fetchMoviesByIds } from '../../utils/api'

function FavoriteMovies() {
	const user = JSON.parse(localStorage.getItem('user') || '{}')

	const [movies, setMovies] = useState<Movie[]>([])
	const [moviesIds, setMoviesIds] = useState<number[]>([])

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
				setMoviesIds(data)
			})
	}, [user.username])

	useEffect(() => {
		const movies = fetchMoviesByIds(moviesIds)

		movies.then((movies) => {
			setMovies(movies)
		})
	}, [moviesIds])

	if (!user.isLoggedIn) {
		return (
			<Navigate
				to='/signin'
				replace={true}
			/>
		)
	}

	return (
		<>
			<h2 className='favorite-title'>Meus filmes favoritos</h2>
			<MovieList movies={movies} />
		</>
	)
}

export default FavoriteMovies
