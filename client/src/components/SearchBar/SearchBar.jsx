import React, {useState} from "react";

const SearchBar = ({onSearch})=>{

    const [searchTerm, setSearchTerm] = useState("")

    const handleChange = (e)=>{
        setSearchTerm(e.target.value)

    const handleSearch =()=>{
        onSearch(searchTerm)
    }
    }
    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange}/>
            <button onClick={handleSearch}>Buscar</button>

        </div>

    )

}