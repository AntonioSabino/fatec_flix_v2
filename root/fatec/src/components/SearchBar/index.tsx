import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Pesquisar filmes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button className="search-button" onClick={handleSearch}>
        <img
          src="https://static-00.iconduck.com/assets.00/search-icon-512x512-dxj09ddf.png"
          className="search-icon"
          alt=""
        />
      </button>
    </div>
  );
}

export default SearchBar;
