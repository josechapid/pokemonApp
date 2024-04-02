//variables de entorno
require("dotenv").config();
const { URL } = process.env;
//bibliotecas
const axios = require("axios");


const getPokemons = async (req, res) => {
  try {
    const limit= 200;
    const pokemonFinal = [];
    const response = await axios.get(`${URL}?offset=00&limit=${limit}`);
    if (response) {
      const pokemons_Url = response.data.results;
      const ListPokemons = await Promise.all(
        pokemons_Url.map(async (pokemon) => {
          try {
            const  response  = await axios.get(pokemon.url);  
            const detailData= response.data;      
  
            const pokemonData = {
              id: detailData.id,
              name: detailData.name,
              image: detailData.sprites.other["official-artwork"].front_default,
              type: detailData.types.map((type) => type.type.name).join("/"),
            };
            pokemonFinal[detailData.id] = pokemonData;
            
          } catch (error) {
            console.log(error);
          }
        })
      );
        res.status(200).json(pokemonFinal)
    }
    console.log("respuesta ",pokemonFinal);
   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = getPokemons;
