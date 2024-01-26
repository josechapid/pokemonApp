import React from "react";
import { Link } from "react-router-dom";
import PokeCard from "../Card/PokeCard"

const PokeList = ({pokemons})=>{
    return (
        <div>
            <h2>Listado de Pokemons</h2>
            {pokemons.map((pokemon)=>(
                <Link key={pokemon.id} to={`/detail/${pokemon.id}`}>
                    <PokeCard pokemon={pokemon}/>
                </Link>
            ))}

        </div>
    )
}

export default PokeList