
const {type, pokemon}= require ("../db")
const postPokemons =async(req, res)=>{
    try {
        const {name, sprite, hp, attack, defense, speed, height, weight, types} = req.body
         if (!name || !sprite || !hp || !attack || !defense || !speed|| !types) {
            throw new Error('Faltan datos')
        }
        else{
            const lowerName = name.toLowerCase()
            if (types.length > 0 && types.length <= 2) {
        const [newPokemon, created] = await pokemon.findOrCreate({
            where: { name: lowerName },
            defaults: { name, sprite, hp, attack, defense, speed, height, weight}
        })
            
        if (created) {
            const addTypes = await type.findAll({
                where: {
                     name: types
                }
            })
            
            await newPokemon.addType(addTypes);
            return res.status(200).json({message: "pokemon Creado exitosamente"})
        } else {
            throw new Error('El pokemon ya existe')
        }
    }
    else {
        throw new Error('El nuevo pokemón no puede tener más de dos tipos')
    }
}} catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = postPokemons