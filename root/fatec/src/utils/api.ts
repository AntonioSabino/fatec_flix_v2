import { Movie, Genre, MovieLink } from '../interfaces/movie.interface'

const API_KEY = '810ba574a37135c7008528d7643e1dc8'

interface ApiUrls {
	[key: string]: {
		title: string
		url: string
	}
}

const apiUrls: ApiUrls = {
	trendingMovies: {
		title: 'Populares',
		url: `/trending/movie/week?api_key=${API_KEY}&language=pt-BR&region=BR`,
	},
	topRatedMovies: {
		title: 'Melhores',
		url: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR&region=BR`,
	},
	nowPlayingMovies: {
		title: 'Recentes',
		url: `/movie/now_playing?api_key=${API_KEY}&language=pt-BR&region=BR`,
	},
	actionMovies: {
		title: 'Ação',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=pt-BR&region=BR`,
	},
	comedyMovies: {
		title: 'Comédia',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=pt-BR&region=BR`,
	},
	horrorMovies: {
		title: 'Horror',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=pt-BR&region=BR`,
	},
	romanceMovies: {
		title: 'Romance',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=pt-BR&region=BR`,
	},
	mysteryMovies: {
		title: 'Mistério',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=9648&language=pt-BR&region=BR`,
	},
	sciFiMovies: {
		title: 'Sci-Fi',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=878&language=pt-BR&region=BR`,
	},
	westernMovies: {
		title: 'Faroeste',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=37&language=pt-BR&region=BR`,
	},
	animationMovies: {
		title: 'Animação',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=pt-BR&region=BR`,
	},
}

async function fetchMovieData(endpoint: string): Promise<Movie[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3${apiUrls[endpoint]?.url}`
		)
		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API')
		}
		const data = await response.json()
		return data.results
	} catch (error) {
		console.error(error)
		throw error
	}
}

// https://api.themoviedb.org/3/discover/movie?api_key=810ba574a37135c7008528d7643e1dc8&with_genres=10770&language=pt-BR&region=BR

async function fetchMovieDetails(id: number): Promise<Movie> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&region=BR`
		)
		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API')
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error(error)
		throw error
	}
}

//api.themoviedb.org/3/genre/movie/list?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDZmYzYzMDI3ODMyZDMxYmNhMWEwMDA0ZGRiMmQ3MCIsInN1YiI6IjY0MDZiYjM2OTcxNWFlMDBkOGY1ODVkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7s8tbredWMOgZ9CT5Dm2kWLSBCgwVWLGD3IKAYsDtw4

async function fetchMovieWatchProviders(id: number): Promise<MovieLink> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
		)
		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API')
		}
		const data = await response.json()
		return data.results.BR
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function fetchGenres(): Promise<Genre[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR&region=BR`
		)
		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API')
		}
		const data = await response.json()
		return data.genres
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function searchMovies(query: string): Promise<Movie[]> {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&region=BR&query=${encodeURIComponent(
				query
			)}`
		)

		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API')
		}

		const data = await response.json()
		return data.results
	} catch (error) {
		console.error(error)
		throw error
	}
}

async function fetchMoviesByIds(ids: number[]): Promise<Movie[]> {
	try {
		const movies = await Promise.all(ids.map((id) => fetchMovieDetails(id)))
		return movies
	} catch (error) {
		console.error(error)
		throw error
	}
}

export {
	fetchMovieData,
	fetchMovieDetails,
	fetchMovieWatchProviders,
	apiUrls,
	searchMovies,
	fetchGenres,
	fetchMoviesByIds,
}
