require("dotenv").config();
const { Sequelize } = require("sequelize");
const {PokemonModel, TypeModel}= require("./models/index")

const { DB_USER, DB_PASSWORD, DB_HOST, DB, DB_PORT, DB_NAME } = process.env;

const URL_CONEXION= `${DB}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

//!conexion a base de datos 

const sequelize = new Sequelize(
  //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`
  URL_CONEXION,
  {
    logging: console.log("conectado a base"), // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

//!modelos de la base de datos, pasando la instancia de sequelize para que el modelo tome todas las propiedades de la db
PokemonModel(sequelize);
TypeModel(sequelize);

//!relaciones 
const { pokemon, type } = sequelize.models;

pokemon.belongsToMany(type, { through: "pokemon_type" });
type.belongsToMany(pokemon, { through: "pokemon_type" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
