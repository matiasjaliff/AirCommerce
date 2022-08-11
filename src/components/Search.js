import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router";
import styles from "../styles/Search.css"
import { ImSearch } from 'react-icons/im';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/Store/${searchText}`);
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    return (
        <>
            <form class="searchContainer" onSubmit={handleSubmit} >
                <div class="searchBox">
                <input
                    type="search"
                    placeholder="Search"
                    className="searchInput"
                    aria-label="Search"
                    onChange={handleChange}
                />
                <button class="searchButton" variant="outline-success"><ImSearch  /></button>
                </div>
            </form>    
        </>
    );
}

export default Search;