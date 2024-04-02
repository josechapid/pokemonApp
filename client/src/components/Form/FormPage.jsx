import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import style from "./FormPage.css";

import validate from "./validate";

const FormCreate = ({ newPokemon,types }) => {

const navigate= useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    sprite: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedTypes = checked
        ? [...inputData.types, value]
        : inputData.types.filter((type) => type !== value);

      setInputData({
        ...inputData,
        types: updatedTypes.slice(0, 2),
      });
    } else {
      setInputData({
        ...inputData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validate(inputData);

    newPokemon(inputData);
    navigate("/home");
  };

  return (
    <div id="form-page">
      <form onChange={handleChange}>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <br />
        <h1>Crear Nuevo Pokémon</h1>

        <div className="label-group">
          <label>Name:</label>
          <input
            placeholder="example: jose"
            type="text"
            value={inputData.name}
            name="name"
            id="name"
            onChange={handleChange}
          />
          {errors.name !== null && <p>{errors.name}</p>}

          <label placeholder="example: ">Image:</label>
          <input
            placeholder="example.png"
            type="text"
            value={inputData.sprite}
            className={style.formInput}
            name="sprite"
            id="sprite"
            onChange={handleChange}
          />
          {errors.sprite !== null && <p>{errors.sprite}</p>}
        </div>

        <div className="label-group">
          <label> Hp:</label>
          <input
            placeholder="minimun attribute value: 100"
            type="text"
            value={inputData.hp}
            className={style.formInput}
            name="hp"
            id="hp"
            onChange={handleChange}
          />
          {errors.hp !== null && <p>{errors.hp}</p>}

          <label>Attack:</label>
          <input
            placeholder="minimun attribute value: 5"
            type="text"
            value={inputData.atk}
            name="atk"
            className={style.formInput}
            onChange={handleChange}
          />
          {errors.atk !== null && <p>{errors.attack}</p>}
        </div>

        <div className="label-group">
          <label>Defense:</label>
          <input
            placeholder="minimun attribute value: 5"
            type="text"
            value={inputData.def}
            className={style.formInput}
            name="def"
            onChange={handleChange}
          />
          {errors.def !== null && <p>{errors.def}</p>}

          <label>Speed:</label>
          <input
            placeholder="minimun attribute value: 10"
            type="text"
            value={inputData.spd}
            className={style.formInput}
            name="spd"
            onChange={handleChange}
          />
          {errors.spd !== null && <p>{errors.speed}</p>}
        </div>

        <div className="label-group">
        <label>Height:</label>
        <input
          placeholder="minimun attribute value: 1"
          type="text"
          value={inputData.height}
          className={style.formInput}
          name="height"
          onChange={handleChange}
        />
        {errors.height !== null && <p>{errors.height}</p>}

        <label >Weight:</label>
        <input
          placeholder="minimun attribute value: 1"
          type="text"
          value={inputData.weight}
          className={style.formInput}
          name="weight"
          onChange={handleChange}
        />
        {errors.weight !== null && <p>{errors.weight}</p>}

        </div>


        <label>Types:</label>
        {errors.types !== null && <p>{errors.types}</p>}
        <div>
          {types?.map((type) => (
            <div key={type.name} >
              <input
                type="checkbox"
                value={type.name}
                onChange={handleChange}
                checked={inputData.types?.includes(type.name)}
              />
              <label>{type.name}</label>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}> Create </button>
      </form>
    </div>
  );
};


export default FormCreate;