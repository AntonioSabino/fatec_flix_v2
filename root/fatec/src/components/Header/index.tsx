import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from './../../assets/logo2.png.png'

export default function Header() {
	const navigate = useNavigate()

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
				<div
					style={{
						display: 'flex',
						width: 100,
						alignItems: 'center',
						justifyContent: 'space-around',
					}}
				>
					<img
						src='https://cdn-icons-png.flaticon.com/64/3237/3237472.png'
						alt='user-icon'
						className='icon'
						onClick={() => {
							navigate('/profile')
						}}
					/>
					<img
						className='icon'
						src='img/logout.png'
						onClick={() => {
							if (window.confirm('Deseja realmente sair?')) {
								localStorage.removeItem('user')
								window.location.reload()
							}
						}}
					/>
				</div>
			</div>
		</header>
	)
}
