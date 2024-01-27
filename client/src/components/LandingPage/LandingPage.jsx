import React from "react";
import {Link} from "react-router-dom"
import "./LandignPage.css"

const LandinPage = ()=>{

    return (
      <div id="landing-page">
        <h1>Bienvenido a mi
            <br /> Pokémon SPA</h1>
        <Link to={"/home"}>
          <button>Entrar</button>
        </Link>
      </div>
    );
}

export default LandinPage