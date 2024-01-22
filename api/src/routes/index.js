require("dotenv").config();
const {URL} = process.env 
const { Router } = require("express");
const getAllPokemons = require ("../controllers/getAllPokemons")
const getPokemonsById = require("../controllers/getPokemonsById")
const getPokemonsQuery=require ("../controllers/getPokemonsQuery")
const postPokemonsCreate= require("../controllers/postPokemonsCreate")
const getPokemonsType = require("../controllers/getPokemonsType")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const url= `${URL}`
router.get("/pokemons", getAllPokemons(url)) 
router.get("/pokemons/:id", getPokemonsById(url)) 
router.get('/pokemons/name?=', getPokemonsQuery) 
router.post("/pokemons", postPokemonsCreate ) 
router.get("/types", getPokemonsType) 


module.exports = router;