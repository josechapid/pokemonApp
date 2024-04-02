require ("dotenv").config()
const {URL} =process.env
const axios = require ("axios")
const {Pokemon, Type, pokemon} = require("../db")

const getPokemonsById = async (req, res)=>{
    try {
      console.log("controlador id");
      const { id } = req.params;
      //console.log(id)
      //aqui buscamos en la base de datos
      if (id.lenght > 4) {
        const pokemonBd = await Pokemon.findOne({
          where: { id: id },
          include: [
            {
              model: Type,
              through: { attributes: [] },
            },
          ],
        });
        if (pokemonBd) {
          const pokemonBdinfo = {
            id: pokemonBd.id,
            name: pokemonBd.name,
            image: pokemonBd.image,
            hp: pokemonBd.hp,
            attack: pokemonBd.attack,
            defense: pokemonBd.defense,
            speed: pokemonBd.speed,
            height: pokemonBd.height,
            weight: pokemonBd.weight,
            types: pokemonBd.types.map((type) => type.name).join("/"),
          };
          return res.status(200).json(pokemonBdinfo);
        }
      }

      const response = await axios.get(`${URL}/${id}`); // iniciar la busqueda en la API
      const pokemonApiData = response.data;

      const pokemonApi = {
        id: pokemonApiData.id,
        name: pokemonApiData.name,
        image: pokemonApiData.sprites.other["official-artwork"].front_default,
        hitpoints: pokemonApiData.stats.find((stat) => stat.stat.name === "hp")
          .base_stat,
        attack: pokemonApiData.stats.find((stat) => stat.stat.name === "attack")
          .base_stat,
        defense: pokemonApiData.stats.find(
          (stat) => stat.stat.name === "defense"
        ).base_stat,
        speed: pokemonApiData.stats.find((stat) => stat.stat.name === "speed")
          .base_stat,
        height: pokemonApiData.height,
        weight: pokemonApiData.weight,
        types: pokemonApiData.types.map((type) => type.type.name).join("/"),
      };

      await pokemon.bulkCreate(pokemonApi).then(() => {
        console.log("Datos insertados correctamente.");
      });

      return res.status(200).json(pokemonApi);
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
}

module.exports = getPokemonsById