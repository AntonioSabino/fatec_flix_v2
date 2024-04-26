import './Header.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo2.png.png'

export default function Header() {
	return (
		<header className='header'>
			<img
				src= {logo}
				alt='logo'
				className='logo'
			/>
			<nav>
				<ul>
					<li>
						<Link to='/'>Início</Link>
					</li>
					<li>
						<Link to='/favorites'>Meu favoritos</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
