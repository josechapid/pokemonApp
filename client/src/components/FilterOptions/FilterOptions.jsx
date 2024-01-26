import React from "react";

const FilterOptions = ({onFiler, onSort, onTypeChange}) =>{
    const handleSortClick=(order)=>{
        onSort(order)
    }
    const handleTypeChange= ((e)=>{
        const selectedType=e.target.value;
        onTypeChange(selectedType)
    })

    return (
<div>
    <button onClick={()=>handleSortClick("asc")}>Ordenar Ascendente</button>
    <button onClick={()=>handleSortClick("desc")}>Ordenar Descendente</button>

    <label htmlFor="typeFilter">Filtrar por tipo:</label>
    <select id="typeFilter" onChange={handleTypeChange}>
        <option value="all">Todos</option>
        {pokemonTypes.map((type)=>(
            <option key={type.name} value={type.name}>{type.name}</option>
        ))}
    </select>
</div>

)}

export default FilterOptions