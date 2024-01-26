const { DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
 /* B_Idd: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    }, */ 
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      /* validate: {
        len: {
          is: /^[a-zA-Z]/,
          arg: [5,30],
          msg: "Debe contener entre 5 a 30 caracteres"
        }
      } */
    },
  }, {timestamps: false});
};
