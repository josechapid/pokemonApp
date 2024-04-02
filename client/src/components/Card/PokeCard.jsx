import React from "react";

const PokeCard= ({pokemon})=>{
    const {name, sprites, types, weight, height}= pokemon;
    const imagenUrl= sprites?.other["official-artwork"]?.front_default;

    return (
      <div>
        <h3>{name}</h3>
        <img src={imagenUrl} alt={"not_found"} />
        <p>
          <strong>Tipos:</strong>{" "}
          {types.map((type) => type.type.name).join("/")}
        </p>
        <p>
            <strong>Peso:</strong> {weight}
        </p>
        <p>
            <strong>Altura: </strong> {height}
        </p>
      </div>
    );
}
export default PokeCard