import React from "react";

const DistanceList = (props) => {
    
    const handleChange = event => {
        props.onchange(event.target.value);
    }
    return(
    <>
        <select name="Distance" onChange={handleChange} className="inputHome2 selectList distance">
            <option value="1000">10 km</option>
            <option value="2000">20 km</option>
            <option value="3000">30 km</option>
            <option value="4000">40 km</option>
            <option value="5000">50 km</option>
            <option value="6000">60 km</option>
            <option value="7000">70 km</option>
            <option value="8000">80 km</option>
            <option value="9000">90 km</option>
            <option value="10000">100 km</option>
        </select> 
    </>
    )
};

export default DistanceList;