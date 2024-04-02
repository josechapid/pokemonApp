import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
  const navigate=useNavigate();
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  
  const handleSearch = () => {
    if (input) {
      onSearch(input);
      navigate("/home");
    } else {
      alert("you have to write a name");
    }
    setInput("");
  };
  return (
    <div className="search-container">
      <input
        type="search"
        value={input}
        onChange={handleInputChange}
        placeholder="Buscar Pokémon por nombre"
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;