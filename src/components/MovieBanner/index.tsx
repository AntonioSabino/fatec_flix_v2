import { Swiper, SwiperSlide } from 'swiper/react'
import { Movie } from '../../interfaces/movie.interface'
import './MovieBanner.css'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function MovieBanner({ movies }: { movies: Movie[] }) {
	return (
		<>
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				navigation={true}
				modules={[Pagination, Navigation]}
			>
				{movies.map((movie: Movie) => (
					<SwiperSlide
						className='movie-banner'
						style={{
							backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`,
						}}
						key={movie.title}
					>
						<h2 className='movie-banner-title'>{movie.title}</h2>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
