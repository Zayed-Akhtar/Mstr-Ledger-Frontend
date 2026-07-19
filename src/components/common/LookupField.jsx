import axios from "axios";
import { VscSearchFuzzy } from "react-icons/vsc";
import React, { useState, useEffect, useRef } from "react";
function LookupField({
    className = "",
    id,
    label,
    placeholder,
    value,
    onChange,
    searchUrl,
    showDropdown = false,
    onPartySelected
}) {

    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const lookupRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                lookupRef.current &&
                !lookupRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowResults(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    const handleSearch = async () => {

        if (!value.trim())
            return;

        setLoading(true);
        setSearchError("");
        setResults([]);
        setShowResults(false);

        try {

            const response = await axios.get(
                `${searchUrl}/${value.trim()}`
            );

            const items = response.data.items;

            // Party Name API
            if (Array.isArray(items)) {

                if (items.length > 1 && showDropdown) {

                    setResults(items);
                    setShowResults(true);

                } else if (items.length === 1) {

                    onPartySelected(
                        items[0],
                        items[0].transactions || []
                    );

                } else {

                    setSearchError("No parties found");

                }

            }
            // Party Code API
            else if (items) {

                onPartySelected(
                    items,
                    items.transactions || []
                );

            } else {

                setSearchError("No parties found");

            }

        } catch (error) {

            setSearchError(
                error.response?.data?.message ||
                error.message ||
                "Search failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className={className}
            ref={lookupRef}
        >

            <label htmlFor={id} className="form-label">
                {label}
            </label>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                }}
            >

                <div style={{ display: "flex" }}>

                    <input
                        id={id}
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={handleSearch}
                        disabled={loading || !value.trim()}
                    >
                        <VscSearchFuzzy />
                    </button>

                </div>

                {searchError && (

                    <div
                        className="text-danger"
                        style={{
                            fontSize: ".85rem",
                            marginTop: ".25rem"
                        }}
                    >
                        {searchError}
                    </div>

                )}

                {
                    showDropdown &&
                    showResults &&
                    results.length > 0 && (

                        <div
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                marginTop: "2px",
                                background: "#fff",
                                border: "1px solid #ced4da",
                                borderRadius: "0.375rem",
                                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                                maxHeight: "320px",
                                overflowY: "auto",
                                zIndex: 1050,
                                width:"421px"
                            }}
                        >
                            {/* Header */}
                            <div
                                className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light"
                            >

                                <strong>Select Party</strong>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowResults(false)}
                                />

                            </div>

                            <table className="table table-hover mb-0">

                                <thead
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        background: "#f8f9fa",
                                        zIndex: 1
                                    }}
                                >
                                    <tr>
                                        <th>Party Name</th>
                                        <th>Party Code</th>
                                        <th>Area</th>
                                        <th>Phone Number</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {results.map((party) => (
                                        <tr
                                            key={party._id}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                onPartySelected(
                                                    party,
                                                    party.transactions || []
                                                );
                                                setShowResults(false);
                                            }}
                                        >
                                            <td>{party.name}</td>
                                            <td>{party.partyCode}</td>
                                            <td>{party.area}</td>
                                            <td>{party.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default React.memo(LookupField);