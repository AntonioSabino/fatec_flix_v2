const API_KEY = '810ba574a37135c7008528d7643e1dc8'

const apiUrls = {
	trendingMovies: {
		title: 'Trending',
		url: `/trending/movie/week?api_key=${API_KEY}&language=pt-BR&region=BR`,
	},
	toRatedMovies: {
		title: 'Top Rated',
		url: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR&region=BR`,
	},
	actionMovies: {
		title: 'Action',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=pt-BR&region=BR`,
	},
	comedyMovies: {
		title: 'Comedy',
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
		title: 'Mystery',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=9648&language=pt-BR&region=BR`,
	},
	sciFiMovies: {
		title: 'Sci-Fi',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=878&language=pt-BR&region=BR`,
	},
	westernMovies: {
		title: 'Western',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=37&language=pt-BR&region=BR`,
	},
	animationMovies: {
		title: 'Animation',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=pt-BR&region=BR`,
	},
	tvMovies: {
		title: 'TV Movie',
		url: `/discover/movie?api_key=${API_KEY}&with_genres=10770&language=pt-BR&region=BR`,
	},
}

async function fetchMovieData(endpoint: string) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3${apiUrls[endpoint]?.url}`
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

export { fetchMovieData }
