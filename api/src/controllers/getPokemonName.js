const axios = require ("axios")
const {pokemon} = require("../db")


const getPokemonName = async (req, res)=>{
    try {
         
        const name = req.query.name?.toLowerCase();
        console.log(name);
        
        let resPokemon = 0
        const pokemonDB= await pokemon.findOne({
            where:{name:name}, 
            attributes:["id", "name", "image", "height", "weight"],
        }); 
        if(pokemonDB){
          console.log("desde bd", pokemonDB);
            resPokemon = pokemonDB.map((pokemon) => ({
             id: pokemonDB.id,
             name: pokemonDB.name,
             image: pokemonDB.image,
             height: pokemonDB.height,
             weight: pokemonDB.weight,
           }))
        }
        
      if (!pokemonDB) {
        const responseApi = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        console.log("desde api", responseApi);
        resPokemon = {
          id: responseApi.data.id,
          name: responseApi.data.name,
          image: responseApi.data.sprites.other.showdown.front_default,
          height: responseApi.data.height,
          weight: responseApi.data.weight,
        };
      }

        if(resPokemon===0){
            return res.status(404).json({message: "No se encontraron pokemons con ese nombre"})
        }
        return res.status(200).json(resPokemon)

    } catch (error) {
        return res.status(500).json({message: "error del servidor al buscar pokemons"})
        
    }
}
module.exports = getPokemonName;
