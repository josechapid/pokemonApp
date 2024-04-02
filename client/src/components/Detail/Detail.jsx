import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import "./Detail.css"



const Detail = () => {
  const { pokemonId } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  console.log(pokemonDetails);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pokemons/${pokemonId}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.log(`error al obtener detalles del pokemon ${pokemonId}`);
      }
    };
    fetchPokemonDetails();
  }, [pokemonId]);

  return (
    <div className="detail-container">
      <h1>Detalles del Pokémon</h1>

      <div className="button-container">
        <Link to={"/home"}>
          <button>Home</button>
        </Link>{" "}
      </div>

      <div className="image-info-container">
        <div className="image-container">
          <div className="image-background"></div>
          {pokemonDetails && pokemonDetails.image ? (
            <img src={pokemonDetails?.image} alt={"not found"} />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>

        <div className="info-container">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <h2>{pokemonDetails?.name}</h2>
              <p>Peso: {pokemonDetails?.weight}</p>
              <p>Altura: {pokemonDetails?.height}</p>
              <p>Hitpoints: {pokemonDetails?.hitpoints}</p>
              <p>Attack: {pokemonDetails?.attack}</p>
              <p>Defense: {pokemonDetails?.defense}</p>
              <p>Tipo:{pokemonDetails?.types}</p>
              <p>Speed:{pokemonDetails?.speed}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;