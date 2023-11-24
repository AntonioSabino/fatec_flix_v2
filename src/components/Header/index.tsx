import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header className='header'>
			<img
				src='img/logo.png'
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
