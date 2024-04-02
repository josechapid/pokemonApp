require("dotenv").config();
const { PORT } = process.env; 
const app = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn
.sync({ force: false }) // el force en true hace que la bd vuelva y se levante, para resetear la bd, contrario a esta opcin esta alter:true, el cual va a conservar lo que ya habia mas lo que modifiquemos
.then(() => {     // esto quiere decir que como estamos haciendo pruebas nos ayuda a cuando se cierre y se vuelva a levantar la informacion que solicitamos este intacta
  app.listen(PORT, () => {
    console.log(`%s listening at: ${PORT}`); // eslint-disable-line no-console
  });
})
.catch(err=>{
  console.log(err);
});
