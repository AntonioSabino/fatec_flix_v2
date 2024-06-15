import './Header.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo2.png.png'

export default function Header() {
	return (
		<header className='header'>
			<div className='header-container'>
				<nav>
					<ul>
						<li>
							<img
								src={logo}
								alt='logo'
								className='logo'
							/>
						</li>
						<li>
							<Link to='/'>Início</Link>
						</li>
						<li>
							<Link to='/favorites'>Meus favoritos</Link>
						</li>
					</ul>
				</nav>
				<img
					className='logout'
					src='img/logout.png'
					onClick={() => {
						localStorage.clear()
						window.location.reload()
					}}
				/>
			</div>
		</header>
	)
}
