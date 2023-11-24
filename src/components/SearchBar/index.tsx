import { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
	onSearch: (query: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = async () => {
		if (searchQuery.trim() !== '') {
			onSearch(searchQuery)
		}
	}

	return (
		<div className='search-container'>
			<input
				type='text'
				placeholder='Pesquisar filmes...'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button onClick={handleSearch}>Pesquisar</button>
		</div>
	)
}

export default SearchBar
