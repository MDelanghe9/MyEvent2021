import React, { useState, useEffect } from "react";

const CityList = (props) => {
    
    const handleChange = event => {
        props.onchange(event.target.value);
    }
    return(
        <select name="villes" onChange={handleChange}>
            <option value="concert">Concert</option>
            <option value="danse">Danse</option>
            <option value="Équitation">Équitation</option>
            <option value="discrimination">discrimination</option>
        </select> 
    )
};

export default CityList;