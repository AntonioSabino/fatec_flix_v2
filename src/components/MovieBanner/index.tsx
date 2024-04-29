import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { Movie } from '../../interfaces/movie.interface'
import './MovieBanner.css'
import { Autoplay, Pagination } from 'swiper/modules'

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
        className='movie-banner-swiper'
				pagination={{clickable:true}}
				modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
			>
				{movies.map((movie: Movie) => (
          
					<SwiperSlide
						className='movie-banner'
						style={{
							backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
						}}
						key={movie.title}
					>
            <Link
          to={`/movie/${movie.id}`}
          className='movie'
          key={movie.id}
        >
						<h2 className='movie-banner-title'>{movie.title}</h2>
          </Link>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
