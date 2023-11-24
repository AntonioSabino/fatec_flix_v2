import './Header.css'

export default function Header() {
	return (
		<header className='header'>
			<h1 className='logo'>Logo Aplicação</h1>
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
