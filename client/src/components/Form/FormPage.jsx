import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./FormPage.css"

const PokemonForm = ({ onCreatePokemon }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleAddType = () => {
    if (selectedType && !types.includes(selectedType)) {
      setTypes([...types, selectedType]);
    }
    setSelectedType("");
  };

  const handleRemoveType = (typeToRemove) => {
    setTypes(types.filter((type) => type !== typeToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (!name || !image || !hp || !attack || !defense) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(Number(hp)) || isNaN(Number(attack)) || isNaN(Number(defense))) {
      alert("Los campos de Vida, Ataque y Defensa deben ser números.");
      return;
    }

    // Crear objeto de Pokémon con la información del formulario
    const newPokemon = {
      name,
      image,
      hp: Number(hp),
      attack: Number(attack),
      defense: Number(defense),
      speed: speed ? Number(speed) : null,
      height: height ? Number(height) : null,
      weight: weight ? Number(weight) : null,
      types,
    };

    // Llamar a la función para crear el nuevo Pokémon
    onCreatePokemon(newPokemon);

    // Limpiar los campos del formulario después de crear el Pokémon
    setName("");
    setImage("");
    setHp("");
    setAttack("");
    setDefense("");
    setSpeed("");
    setHeight("");
    setWeight("");
    setTypes([]);
    setSelectedType("");
  };

  return (
    <div id="form-page">
      <form onSubmit={handleSubmit}>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <br />
        <h1>Crear Nuevo Pokémon</h1>

        <div className="label-group">
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z]+"
              required
            />
          </label>
          <label>
            Imagen:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="label-group">
          <label>
            Vida:
            <input
              type="text"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              pattern="[0-9]+"
              required
            />
          </label>
          <label>
            Ataque:
            <input
              type="text"
              value={attack}
              onChange={(e) => setAttack(e.target.value)}
              pattern="[0-9]+"
              required
            />
          </label>
        </div>

        <div className="label-group">
          <label>
            Defensa:
            <input
              type="text"
              value={defense}
              onChange={(e) => setDefense(e.target.value)}
              pattern="[0-9]+"
              required
            />
          </label>
          <label>
            Velocidad:
            <input
              type="text"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              pattern="[0-9]+"
            />
          </label>
        </div>

        <div className="label-group">
          <label>
            Altura:
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              pattern="[0-9]+"
            />
          </label>
          <label>
            Peso:
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              pattern="[0-9]+"
            />
          </label>
        </div>

        <div className="centered-group">
          <label>
            Tipo:
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="" disabled>
                Seleccionar Tipo
              </option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>
              <option value="steel">Steel</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="unknown">Unknown</option>
              <option value="shadow">Shadow</option>
            </select>
          </label>
        </div>

        <div className="centered-group">
          <button type="button" onClick={handleAddType}>
            Agregar Tipo
          </button>
        </div>

        <div>
          <h4>Tipos Seleccionados:</h4>
          <ul>
            {types.map((type) => (
              <li key={type}>
                {type}{" "}
                <button type="button" onClick={() => handleRemoveType(type)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="centered-group">
          <button type="submit">Crear Pokémon</button>
        </div>
      </form>
    </div>
  );
};

export default PokemonForm;