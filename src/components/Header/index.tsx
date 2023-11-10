import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <h1 className="logo">Logo Aplicação</h1>
            <input type="text" id="search-movie" placeholder="Buscar um filme..." />
            <nav>
                <ul>
                    <li><a href="#">Início</a></li>
                    <li><a href="#">Categorias</a></li>
                    <li><a href="#">Meu favoritos</a></li>
                </ul>
            </nav>
        </header>
    )
}