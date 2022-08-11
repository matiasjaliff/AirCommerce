import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router";
import s from "../styles/SearchAdmin.module.css"
import { ImSearch } from 'react-icons/im';

const SearchAdmin = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate()
   
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/update_product/${searchText}`)
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    return (
        <>
            <form className={s.searchContainer} onSubmit={handleSubmit} >
                <div className={s.searchBox}>
                <input
                    type="search"
                    placeholder="Search for the product"
                    className={s.searchInput}
                    aria-label="Search"
                    onChange={handleChange}
                />
                <button className={s.searchButton} variant="outline-success"><ImSearch  /></button>
                </div>
            </form>    
        </>
    );
}

export default SearchAdmin;