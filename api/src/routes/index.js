//Express
const { Router } = require("express");
const router = Router();

//routes
const getPokemons = require ("../controllers/getPokemons")
const getPokemonsById = require("../controllers/getPokemonsById")
const getPokemonName = require("../controllers/getPokemonName");
const postPokemons = require("../controllers/postPokemons")
const getPokemonsType = require("../controllers/getPokemonsType")


//rutas 
router.get("/pokemons", getPokemons); 
router.get("/pokemons/:id", getPokemonsById); 
router.get("/pokemons/name", getPokemonName); 
router.post("/pokemons", postPokemons) 
router.get("/type", getPokemonsType) 


module.exports = router;