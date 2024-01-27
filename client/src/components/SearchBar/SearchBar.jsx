import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} //falta una s
      />
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
};

export default SearchBar;