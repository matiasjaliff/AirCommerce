import React from "react";
import axios from "axios";

async function find(path) {
    const res = await axios
        .get(`http://localhost:8080/api${path}`);
    return res.data;
}

export default find;