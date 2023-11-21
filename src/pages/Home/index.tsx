import './Home.css'

import { apiUrls, fetchMovieData } from '../../utils/api'
import { useEffect, useState } from 'react'
import MovieBanner from '../../components/MovieBanner'
import MovieList from '../../components/MovieList'
import { Movie } from '../../interfaces/movie.interface'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function Home() {
	const [category, setCategory] = useState<string>('trendingMovies')
	const [movies, setMovies] = useState<Movie[]>([])
	const [bannerMovies, setBannerMovies] = useState<Movie[]>([])

	useEffect(() => {
		const fetchMovies = async () => {
			const moviesData = await fetchMovieData(category)
			setMovies(moviesData)
			setBannerMovies(moviesData.slice(0, 5))
		}

		fetchMovies().catch(console.error)
	}, [category])

	return (
		<>
			<Swiper
				slidesPerView={7}
				spaceBetween={30}
				centeredSlides={true}
				loop={true}
				navigation={true}
				modules={[Pagination, Navigation]}
				className='swiper-categories'
			>
				{Object.entries(apiUrls).map(([key, { title }]) => (
					<SwiperSlide
						className='slide-category'
						key={key}
						onClick={() => setCategory(key)}
					>
						{title}
					</SwiperSlide>
				))}
			</Swiper>
			<MovieBanner movies={bannerMovies} />
			<MovieList movies={movies} />
		</>
	)
}

export default Home
