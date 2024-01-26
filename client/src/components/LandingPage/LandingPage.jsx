import React from "react";
import {Link} from "react-router-dom"

const LandinPage = ()=>{

    return(
        <div>
            <h1>Bienvenido a pokemon App</h1>
            <Link to={"/home"}>
            <button>Entrar</button>
            </Link>

        </div>

    )
}

export default LandinPage