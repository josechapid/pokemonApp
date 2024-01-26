//componentes
import SearchBar from "../SearchBar/SearchBar"
import PokeList from "../PokeList"
import FilterOptions from "../FilterOptions/FilterOptions"
import Pagination from "../Pagination/Pagination"

//hooks
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"

//Bibliotecas
import axios from "axios"



const HomePage = ()=>{

    const [pokemonsList, setPokemonsList] = useState([])
    const [totalPages, setTotalPages]=useState(0)
    const [currentPage, setCurrentPage]= useState(1)
    const [pokemonTypes, setPokemonTypes]=useState([])
    const [sortOrder, setSortOrder]= useState("asc")
    const [selectedType, setSelectedType]= useState("all")
    const [visiblePokemons, setVisiblePokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(()=>{
        const fetchPokemonsList=async()=>{
            try { 
                const response = await axios.get(
                  "https://pokeapi.co/api/v2/pokemon", {
                    params: {offset: (currentPage -1) * 12, limit: 12}
                  });
                
                setPokemonsList(respnse.data.results);
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

    useEffect(() => {
      // Filtrar y ordenar la lista de Pokémon según las opciones seleccionadas
      let filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [pokemonList, selectedType, sortOrder, searchTerm]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const handleSort = (order) => {
      setSortOrder(order);
    };

    const handleFilter = (type) => {
      setSelectedType(type);
    };

    const handleSearch = (term) => {
      setSearchTerm(term);
    };

 return (
   <div>
     <h1>Home Page</h1>
     <SearchBar onSearch={handleSearch} />
     <FilterOptions onFilter={handleFilter} onSort={handleSort} onTypeChange={handleTypeChange} pokemonTypes={pokemonTypes}/>
     <PokeList pokemons={visiblePokemons} />
     <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
     <Link to="/">Volver a la Landig</Link>
     
   </div>
 );
}
export default HomePage