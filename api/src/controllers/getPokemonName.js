const axios = require ("axios")
const {Op} = require("sequelize")
const {pokemon} = require("../db")


const getPokemonName = async (req, res)=>{
    try {
        const {name} =req.query
      /*   const pokemonDB= await pokemon.findOne({
            where: {
                name:{
                    [Op.iLike]: `%${name}%`
                },
            }, attributes:["id", "nombre", "image", "height", "weight"],
        })
        if (!pokemonDB){
            return res.status(404).json([message: "pokemon no encontrado en la base de datos"])
        } */

       /*  const pokeDataBd = pokemonDB.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          height: pokemon.height,
          weight: pokemon.weight,
        })); */

        /* const responseApi = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const pokemonDatails= response.data;
        const pokemonApi = {
          id: responseApi.id,
          name: responseApi.name,
          image: responseApi.sprites.other.showdown.front_default,
          height: responseApi.height,
          weight: responseApi.weight,
        }; */

        /* const allPokemons = [...pokeDataBd, pokemonApi];

        if(allPokemons.length=== 0){
            return res.status(404).json({message: "No se encontraron pokemons con ese nombre"})
        } */
       /*  return res.status(200).json(pokemonApi) */

    } catch (error) {
        return res.status(500).json({message: "error del servidor al buscar pokemons"})
        
    }
}
module.exports = getPokemonName;
