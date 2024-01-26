import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import axios from "axios"


const Detail = ()=>{
const {pokemonId}= useParams()
const [pokemonDetails, setPokemonDetails]= useState(null)

useEffect(()=>{
    const fetchPokemonDetails= async ()=>{
        try { 
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            );
            setPokemonDetails(response.data)
        } catch (error) {
            console.log(`error al obtener detalles del pokemon ${pokemonId}`);            
        }
    }
    fetchPokemonDetails
}, [pokemonId])

    return (
        <div>
            {pokemonDetails?(
                <>
                <h2>{pokemonDetails.name}</h2>
                <img src={pokemonDetails.sprites.other['official-artwork'].front_default} alt={"not found"} />
                <p>weight: {pokemonDetails.weight}</p>
                <p>height: {pokemonDetails.height}</p>
                <p>Tipo: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
                <p>Hp: {pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                <p>Attack: {pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                <p>Defense: {pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                <p>Speed: {pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                </>
            ): (
                <p>Cargando detalles del pokemon...</p>
            )}
        </div>
    )
}

export default Detail