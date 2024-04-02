//componentes
import SearchBar from "../SearchBar/SearchBar"
import Pagination from "../Pagination/Pagination"
import PokemonForm from "../Form/FormPage"

//hooks
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"

//Bibliotecas
import axios from "axios"

//styles
import "./HomePage.css"



const HomePage = ()=>{
  //const [pokemonsList, setPokemonsList] = useState([])
  
  const [order, setOrder] = useState("original");     
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [searchPokemon, setSearchPokemon] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);



  const URL = `http://localhost:3001/pokemons`;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/pokemons?limit=108"
        ); 
        const pokemonsData = response.data.slice(1).map((pokemon) => ({
          name: pokemon.name,
          image: pokemon.image,
          type: pokemon.type,
        }));
         
        setPokemon(pokemonsData);
        
      } catch (error) {
        console.log("Error al obtener la lista de Pokemon: ", error);
      };      
    };    
     const fetchTypes = async () => {
       try {
         const response = await axios.get("http://localhost:3001/types");
         setAllTypes(response.data);
       } catch (error) {
         console.log("Error al obtener los tipos de Pokémon: ", error);
       }
     };
    
    fetchPokemons(); 
    fetchTypes()   
  }, []);



   const handleSearch = async (pokemonName) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        const {name, sprites, types} = response.data
        const imageUrl = sprites.other["official-artwork"].front_default;
        const pokemonTypes = types.map((type) => type.type.name);
        setSearchPokemon({ name, imageUrl, pokemonTypes });

      } catch (error) {
        console.log("Error al buscar el Pokémon: ", error);
        alert("No se encontró el Pokémon");
        setSearchPokemon(null);     
      }};

       const handleSort = (e) => {
         setOrder(e.target.value);
       };

     
      
      const indexOfLastPokemon = currentPage * pokemonsPerPage;
      const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
      const currentPokemons = pokemon.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
      );

      const paginate = (pageNumber) =>{
      setCurrentPage(pageNumber);
      } 

       const handleTypeFilter = (type) => {
         if (selectedTypes.includes(type)) {
           setSelectedTypes(selectedTypes.filter((t) => t !== type));
         } else {
           setSelectedTypes([...selectedTypes, type]);
         }
       };

       const filterBySelectedTypes = (pokeData) => {
         if (selectedTypes.length === 0) {
           return true; // Si no se han seleccionado tipos, mostrar todos los Pokémon
         }
         return pokeData.types.some((type) =>
           selectedTypes.includes(type.name)
         );
       };

       const sortedPokemons = [...currentPokemons].sort((a, b) => {
         if (order === "asc") {
           return a.name.localeCompare(b.name);
         } else if (order === "desc") {
           return b.name.localeCompare(a.name);
         } else {
           return 0; // Mantener el orden original de la API
         }
       });

  return (
    <div id="home-page">
      <div className="button-containerI">
        <Link to="/">
          <button>Landig</button>
        </Link>
        <Link to="/formPage">
          <button>Crear Pokemon</button>
        </Link>
      </div>

      <img
        src="https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6_w200.webp"
        alt="Pokemon"
      />
      <h1>Pokémon</h1>

      <div className="filter-search-container">
        <div className="order-dropdown">
          <select value={order} onChange={handleSort}>
            <option value="original">Estado Original</option>
            <option value="asc">Ordenar por nombre (ascendente)</option>
            <option value="desc">Ordenar por nombre (descendente)</option>
          </select>
        </div>

        <SearchBar id="button-buscar" onSearch={handleSearch} />

        <div className="type-filter">
          <select value={selectedTypes} onChange={handleTypeFilter}>
            <option value="">Todos los tipos</option>
            <option value="normal">Normal</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="electric">Eléctrico</option>
            {/* Agrega más opciones según los tipos de Pokémon que desees */}
          </select>
        </div>
      </div>

      <div id="pokemon-grid">
        {searchPokemon ? (
          <div className="pokemon-card">
            <Link to={`/detail/${searchPokemon.name}`}>
              <img
                src={searchPokemon.imageUrl}
                alt={searchPokemon.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "placeholder-image-url";
                }}
              />
              <p>{searchPokemon.name.toUpperCase()}</p>
              <p>
                TYPES:{" "}
                {searchPokemon.pokemonTypes
                  ? searchPokemon.pokemonTypes.join(" / ").toUpperCase()
                  : "Unknown"}
              </p>
            </Link>
          </div>
        ) : sortedPokemons.length > 0 ? (
          sortedPokemons.map((pokeData) => (
            <div key={pokeData.name} className="pokemon-card">
              <Link to={`/detail/${pokeData.name}`}>
                {console.log(pokeData)}
                <img
                  src={pokeData.image}
                  alt={pokeData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "placeholder-image-url";
                  }}
                />
                <p>{pokeData.name.toUpperCase()}</p>
                <p>TYPES: {pokeData.type.toUpperCase()}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando</p>
        )}
      </div>

      <div className="pagination">
        {pokemon.length > 0 && (
          <Pagination
            itemsPerPage={pokemonsPerPage}
            totalItems={pokemon.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}
export default HomePage