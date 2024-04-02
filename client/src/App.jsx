import React from 'react';
import HomePage from "./components/Home/HomePage"
import LandinPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import FormPage from './components/Form/FormPage'
import {Routes, Route} from 'react-router-dom';
import "../src/App.css"

function App () {

  const newPokemon = async (pokemon) => {
    const url = "http://localhost:3001/pokemons";
    try {
      const response = await axios.post(url, pokemon);
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert(error.response.data);
      }
    }
  };




  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandinPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:pokemonId" element={<Detail />} />
        <Route path="/formPage" element={<FormPage newPokemon={newPokemon} />} />
      </Routes>
    </div>
  );
}

export default App;
