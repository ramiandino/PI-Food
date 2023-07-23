import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import styles from "../styles/SearchBar.module.css";
import icono from "../styles/images/iconoSearch.png";

export default function SearchBar() {
    const dispatch = useDispatch();
    //estado local
    const [name,setName] = useState("");

    function handleInputChange(event) {
        setName(event.target.value);
        console.log(name);
    }
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getNameRecipes(name));  //name va a ser mi estado local.
        setName("");
    }
    return (
        
         <div className={styles.search}>
            <input
                type="text"
                placeholder="Search for your recipe..."
                onChange={(event) => handleInputChange(event)}
                value={name}
                className={styles.input}
            />
            <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className={styles.searchButton}
            >
                <img src={icono} alt="buscar" className={styles.buscar}></img>
            </button>            
        </div> 
    )
}