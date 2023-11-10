import { fetchMovieData } from './utils/api'
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import MovieBanner from './components/MovieBanner'
import MovieList from './components/MovieList'
import { Movie } from './interfaces/movie.interface'

function App() {
	const [movies, setMovies] = useState<Movie[]>([])
	const [bannerMovies, setBannerMovies] = useState<Movie[]>([])

	useEffect(() => {
		const fetchMovies = async () => {
			const moviesData = await fetchMovieData('trendingMovies')
			setMovies(moviesData.results)
			setBannerMovies(moviesData.results.slice(0, 5))
		}

		fetchMovies().catch(console.error)
	}, [])

	return (
		<>
			<Header />
			<MovieBanner movies={bannerMovies} />
			<MovieList movies={movies} />
		</>
	)
}

export default App
