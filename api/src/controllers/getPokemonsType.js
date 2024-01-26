const {type} = require("../db")
const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/type";

const getPokemonsType = async(req, res)=>{
    try {
        const response = await axios.get(`${URL}`)
        if (!response || !response.data || !response.data.results){
            return res.status(404).send("no se encontro la informacion de types")
        }
        const {results}=response.data;
        const types = results.map((type, index)=>(
            {
            id: index + 1,
            name: type.name,
        }))
       
        await type.bulkCreate(types)

        
        return res.status(200).json(types)
        
    } catch (error) {

        return res.status(500).send(error.message)
        
    }
}

module.exports= getPokemonsType