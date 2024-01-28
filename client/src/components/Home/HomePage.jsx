//componentes
import SearchBar from "../SearchBar/SearchBar"
import PokeList from "../PokeList/PokeList"
import FilterOptions from "../FilterOptions/FilterOptions"
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

    const [pokemonsList, setPokemonsList] = useState([])
    const [totalPages, setTotalPages]=useState(0)
    const [currentPage, setCurrentPage]= useState(1)
    const [pokemonTypes, setPokemonTypes]=useState([])
    const [sortOrder, setSortOrder]= useState("asc")
    const [selectedType, setSelectedType]= useState("all")
    const [visiblePokemons, setVisiblePokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon]= ([])

    const URL= `http://localhost:3001/pokemons`;


    useEffect(()=>{
        const fetchPokemonsList=async()=>{
            try { 
                const response = await axios.get(
                  "https://pokeapi.co/api/v2/pokemon", {
                    params: {offset: (currentPage -1) * 12, limit: 12}
                  });
                
                setPokemonsList(response.data.results);
                setTotalPages(Math.ceil(response.data.count /12));                
            } catch (error) {
                console.log("Error al obtener la lista de Pokemons: ", error)                
            }
        }
        const fetchPokemonsType= async ()=>{
            try {
                const response = await axios.get(
                  "https://pokeapi.co/api/v2/type"
                );
                setPokemonTypes(response.data.results)                
            } catch (error) {
                console.log("Error al obtener types de Pokemons: ", error);                
            }
        }
        fetchPokemonsList()
        fetchPokemonsType()
    }, [currentPage])

    //! revisar pokemonList
    let pokemonList= []


    useEffect(() => {
      // Filtrar y ordenar la lista de Pokémon según las opciones seleccionadas
      let filteredList = pokemonList?.filter((pokemon) =>
        pokemon.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (selectedType !== "all") {
        filteredList = filteredList.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        );
      }

      filteredList.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });

      setVisiblePokemons(filteredList);
    }, [pokemonsList, selectedType, sortOrder, searchTerm]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const handleSort = (order) => {
      setSortOrder(order);
    };

    const handleFilter = (type) => {
      setSelectedType(type);
    };

    const handleSearch = async (input) => {
      try {
        const {status, data}= await axios(`${URL}/${input}`)
        if(status >= 200 && status <400){
          if(data.name){
            setPokemon((oldState)=>[...oldState, data])
          }
        } else {
          window.alert("No hay pokemons con ese nombre")
        }
        
      } catch (error) {
        console.log(error);        
      }


    };
    const handleCreatePokemon = (newPokemon) => {
      // Lógica para enviar la información del nuevo Pokémon al servidor o al estado de la aplicación
      console.log("Nuevo Pokémon creado:", newPokemon);
    };
    const handleTypeChange = (type) => {
      
    }

 return (
   <div id="home-page">
     
       <img
         src="https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6_w200.webp"
         alt="Pokemon"
         />
         <h1>Pokémon</h1>
     
     <div className="button-container">
       <Link to="/">
        <button>Landig</button>
       </Link>
       <Link to="/formPage">
         <button>Crear Pokemon</button>
       </Link>
     </div>
     
     <br />
     <div className="filter-search-container">
       <FilterOptions
         onFilter={handleFilter}
         onSort={handleSort}
         onTypeChange={handleTypeChange}
         pokemonTypes={pokemonTypes}
       />
       <SearchBar onSearch={handleSearch} />
     </div>

     <PokeList pokemons={visiblePokemons} />
     <Pagination
       totalPages={totalPages}
       currentPage={currentPage}
       onPageChange={handlePageChange}
     />
   </div>
 );
}
export default HomePage