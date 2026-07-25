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
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />

            <i className="bi bi-search"></i>

        </div>

    );

};

export default SearchBox;