require("dotenv").config();
const {URL} = process.env 
const { Router } = require("express");
//const getAllPokemons = require ("../controllers/getAllPokemons")
const getPokemonsById = require("../controllers/getPokemonsById")
getPokemonName = require("../controllers/getPokemonName");
//const postPokemons= require("../controllers/postPokemons")
const getPokemonsType = require("../controllers/getPokemonsType")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const url= `${URL}`
//router.get("/pokemons", getAllPokemons(url)) 
router.get("/pokemons/:id", getPokemonsById) 
router.get("/pokemons/name", getPokemonName); 
//router.post("/pokemons", postPokemons) 
router.get("/type", getPokemonsType) 


module.exports = router;