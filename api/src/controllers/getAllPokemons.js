const axios = require("axios");

const getAllPokemons = async (req, res, url) => {
  try {
    const { data } = await axios(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.export = getAllPokemons;
