import React from 'react';
import HomePage from "./components/Home/HomePage"
import LandinPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import FormPage from './components/Form/FormPage'
import {Routes, Route} from 'react-router-dom';
import "../src/App.css"

function App () {
  return (
    <div className="App"> 
    
        <Routes>
          <Route exact path="/" element={<LandinPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/detail/:pokemonId" element={<Detail/>} />
          <Route path="/formPage" element={<FormPage/>} />

        </Routes>
    </div>
  );
}

export default App;
