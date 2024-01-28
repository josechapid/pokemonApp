import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleButtonPress= (e) => {
      e.preventDefault
      onSearch(input);
      setInput("")
  };

  return (
    <div>
      <input
        type="search"
        value={input}
        onChange={handleInputChange}
        placeholder="Buscar Pokémon"/>
      <button onClick={handleButtonPress}>Buscar</button>
    </div>
  );
};

export default SearchBar;