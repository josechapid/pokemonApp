const {type} = require("../db")
const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/type";

const getPokemonsType = async(req, res)=>{
    try {
        let resTypePokemon = 0
        const consultaDB = await type.findAll();        
        
        if (consultaDB.length){
             resTypePokemon = consultaDB.map((instancia) => //para que la res no trae la metadata
            instancia.get({ plain: true })
            );
            console.log("r base de datos", resTypePokemon);
        }
         if(resTypePokemon === 0) {
            const response = await axios.get(`${URL}`)
            console.log("respuesta de api", response.count);
            if (!response){
                return res.status(404).send("no se encontro la informacion de types")
            }
            const {results}=response.data;
           
            resTypePokemon = results.map((pokemonType, index) => ({
              id: index + 1,
              name: pokemonType.name,
            }));
            //console.log("respuesta", resTypePokemon);
            await type.bulkCreate(resTypePokemon).then(() => {
    console.log('Datos insertados correctamente.');
  })
        }       
        return res.status(200).json(resTypePokemon);
        
    } catch (error) {

        return res.status(500).send(error.message)
        
    }
}

module.exports= getPokemonsType