import './FavoriteMovies.css'

import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList'
import { Movie } from '../../interfaces/movie.interface'

import { Navigate } from 'react-router-dom'

function FavoriteMovies() {
	const user = JSON.parse(localStorage.getItem('user') || '{}')
	const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		if (user.isLoggedIn) {
			setMovies(favorites)
		}
	}, [user.isLoggedIn, favorites])

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
