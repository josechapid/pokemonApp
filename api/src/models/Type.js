const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    ID: {
      type: DataTypes.UUID,
      defaultvalue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          arg: [5,30],
          msg: "Debe contener entre 5 a 30 caracteres"
        }
      }
    },
  }, {timestamps: false});
};
