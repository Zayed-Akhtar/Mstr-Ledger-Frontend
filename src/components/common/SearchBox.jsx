import React from "react";

const SearchBox = ({
    value,
    onChange,
    placeholder = "Search..."
}) => {

    return (

        <div className="search-box">

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                style={{color:"black"}}
            />

            <i className="bi bi-search"></i>

        </div>

    );

};

export default SearchBox;