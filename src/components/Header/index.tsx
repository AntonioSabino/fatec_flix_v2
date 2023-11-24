import './Header.css'

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
						<a href='/'>Início</a>
					</li>
					<li>
						<a href='/favorites'>Meu favoritos</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}
