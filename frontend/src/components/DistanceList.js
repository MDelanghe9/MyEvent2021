import React, { useState, useEffect } from "react";

const DistanceList = (props) => {
    
    const handleChange = event => {
        props.onchange(event.target.value);
    }
    return(
    <>
        <select name="Distance" onChange={handleChange}>
            <option value="1000">10km</option>
            <option value="2000">20km</option>
            <option value="3000">30km</option>
            <option value="4000">40km</option>
            <option value="5000">50km</option>
            <option value="6000">60km</option>
            <option value="7000">70km</option>
            <option value="8000">80km</option>
            <option value="9000">90km</option>
            <option value="10000">100km</option>
        </select> 
    </>
    )
};

export default DistanceList;