const axios = require ("axios")

const postPokemonsCreate = async (req, res)=>{
    try {
        const {body} = req;
        //hay que enviar a la base de datos y que se pueda relacionar con sus tipos
        // res.status(201).json(basedadatos)
        
    } catch (error) {
    res.status(400).send(error)
    }
}

module.exports= postPokemonsCreate