import axios from "axios";
import { VscSearchFuzzy } from "react-icons/vsc";
import React, { useState, useEffect, useRef } from "react";
import SpinnerButton from "../spinners/SpinnerButton";

function LookupField({
    className = "",
    id,
    label,
    placeholder,
    value,
    onChange,
    searchUrl,
    showDropdown = false,
    onPartySelected,
    onSelect,
    allowCustomValue = false,
    customValueMessage = "New!",
    autoSearchOnChange = false,
    searchParam = "search",
    renderResultItem,
    searchMode = "party",
    onAddNew = null,
    fieldType = "partyName"
}) {

    const safeValue = typeof value === "string"
        ? value
        : value == null
            ? ""
            : String(value);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showCustomValueHint, setShowCustomValueHint] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
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
            document.removeEventListener("mousedown", handleOutsideClick);
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
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (!autoSearchOnChange) {
            return;
        }

        const query = safeValue.trim();

        if (!query) {
            setResults([]);
            setShowResults(false);
            setShowCustomValueHint(false);
            setSearchError("");
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [safeValue, autoSearchOnChange, searchUrl, searchMode, searchParam]);

    // Reset search state when the input is cleared so "No results"
    // doesn't appear while the user is typing. The "No results"
    // indicator appears only after an explicit search (Enter or click).
    useEffect(() => {
        // Clear transient search UI whenever the input value changes
        // (including when parent code sets the value after creating a party).
        // This ensures "No results" or error messages don't stick around
        // after a programmatic value update.
        setSearchError("");
        setShowCustomValueHint(false);
        setResults([]);
        setShowResults(false);
        setHasSearched(false);
    }, [safeValue]);

    const handleSelect = (item) => {
        if (onSelect) {
            onSelect(item);
        } else if (onPartySelected) {
            onPartySelected(item, item.transactions || []);
        }

        setShowResults(false);
        setResults([]);
        setSearchError("");
        setShowCustomValueHint(false);
        setHasSearched(false);
    };

    const handleSearch = async () => {
        setHasSearched(true);
        const query = safeValue.trim();

        if (!query) {
            setResults([]);
            setShowResults(false);
            setShowCustomValueHint(false);
            return;
        }

        setLoading(true);
        setSearchError("");
        setResults([]);
        setShowResults(false);
        setShowCustomValueHint(false);

        try {
            let response;

            if (searchMode === "query") {
                response = await axios.get(searchUrl, {
                    params: {
                        [searchParam]: query
                    },
                    withCredentials:true
                });
            } else {
                response = await axios.get(`${searchUrl}/${query}`, {withCredentials:true});
            }

            // Prefer explicit `items` or `data` fields when present. If `items`
            // is present but null, treat it as no-results instead of falling
            // back to the whole response object (which would incorrectly
            // be treated as a selectable result).
            let payload;
            if (Object.prototype.hasOwnProperty.call(response.data || {}, 'items')) {
                payload = response.data.items;
            } else if (Object.prototype.hasOwnProperty.call(response.data || {}, 'data')) {
                payload = response.data.data;
            } else {
                payload = response.data;
            }

            const items = Array.isArray(payload) ? payload : payload ? [payload] : [];

            if (searchMode === "query") {
                if (items.length > 0) {
                    setResults(items);
                    setShowResults(Boolean(showDropdown));
                    if (!showDropdown && items.length === 1) {
                        handleSelect(items[0]);
                    }
                } else if (allowCustomValue) {
                    setShowCustomValueHint(true);
                } else {
                    setSearchError("No results found");
                }
                return;
            }

            if (Array.isArray(items)) {

                if (items.length > 1 && showDropdown) {

                    setResults(items);
                    setShowResults(true);

                } else if (items.length === 1) {

                    handleSelect(items[0]);

                } else {

                    setSearchError("No parties found");

                }

            }
            else if (items) {

                handleSelect(items);

            } else {

                setSearchError("No parties found");

            }

        } catch (error) {
            if (allowCustomValue && searchMode === "query") {
                setShowCustomValueHint(true);
                return;
            }

            setSearchError(
                error.response?.data?.message ||
                error.message ||
                "Search failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleInputKeyDown = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        if (showResults && results.length > 0) {
            handleSelect(results[0]);
            return;
        }

        handleSearch();
    };

    const handleSearchButtonClick = () => {
        handleSearch();
    };

    const renderDefaultResults = () => (
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
                width: "421px"
            }}
        >
            <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light">
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
                    {results.map((party) => {
                        const areaName = typeof party.area === "string"
                            ? party.area
                            : party.area?.name || "-";

                        return (
                            <tr
                                key={party._id || party.id || party.name}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSelect(party)}
                            >
                                <td>{party.name}</td>
                                <td>{party.partyCode}</td>
                                <td>{areaName}</td>
                                <td>{party.phoneNumber}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

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
                        value={safeValue}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />

                    <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={handleSearchButtonClick}
                        disabled={loading || !safeValue.trim()}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '42px' }}
                    >
                        {loading ? <SpinnerButton size={18} /> : <VscSearchFuzzy />}
                    </button>

                </div>

                {(searchError || (hasSearched && !loading && !showResults && results.length === 0 && safeValue.trim())) && (
                    <div
                        style={{
                            fontSize: ".85rem",
                            marginTop: ".25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            width: 'max-content'
                        }}
                    >
                        <div className={searchError ? "text-danger" : "text-muted"}>
                            {searchError || "No results found"}
                        </div>
                        {onAddNew && safeValue.trim() && (
                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => onAddNew(safeValue.trim(), fieldType)}
                                title="Create new party"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px' }}
                            >
                                <span style={{ fontSize: '18px' }}>Add Party</span>
                            </button>
                        )}
                    </div>
                )}

                {allowCustomValue && showCustomValueHint && safeValue && safeValue.trim() && (
                    <div
                        className="text-success"
                        style={{
                            fontSize: ".85rem",
                            marginTop: ".25rem"
                        }}
                    >
                        {customValueMessage}
                    </div>
                )}

                {showDropdown && showResults && results.length > 0 && (
                    renderResultItem ? (
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
                                width: "421px"
                            }}
                        >
                            <div className="list-group list-group-flush">
                                {results.map((item, index) => (
                                    <button
                                        type="button"
                                        key={item._id || item.id || item.name || index}
                                        className="list-group-item list-group-item-action text-start"
                                        onClick={() => handleSelect(item)}
                                    >
                                        {renderResultItem(item)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : renderDefaultResults()
                )}

            </div>

        </div>

    );

}

export default React.memo(LookupField);
