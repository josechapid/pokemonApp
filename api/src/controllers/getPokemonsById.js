const axios = require ("axios")

const getPokemonsById = async (req, res, url)=>{
    try {
        const {id}= req.params;
        const {data} = await axios (`${url}/${id}`)
        res.status(200).json(data)        
    } catch (error) {
        res.status(400).send(error)
        
    }
}

module.exports = getPokemonsById