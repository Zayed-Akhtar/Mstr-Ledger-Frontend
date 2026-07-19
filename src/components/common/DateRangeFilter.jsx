import React, { useEffect } from "react";
import { RiResetLeftFill } from "react-icons/ri";

function DateRangeFilter({
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    fromLabel = "From",
    toLabel = "To",
    resetTrigger
}) {

    useEffect(() => {
        setFromDate("");
        setToDate("");
    }, [resetTrigger]);

    const handleReset = () => {
        setFromDate("");
        setToDate("");
    };

    return (
        <div
            style={{
                height: "fit-content",
                display: "flex",
                gap: "2%",
                fontSize: "0.9rem"
            }}
        >
            <div className="date-filter">
                <label className="form-label">
                    {fromLabel}
                </label>

                <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    max={toDate || undefined}
                    onChange={(e) =>
                        setFromDate(e.target.value)
                    }
                />
            </div>

            <div className="date-filter">
                <label className="form-label">
                    {toLabel}
                </label>

                <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) =>
                        setToDate(e.target.value)
                    }
                />
            </div>

            <button
                type="button"
                className="btn btn-light"
                style={{ fontSize: "small" }}
                onClick={handleReset}
            >
                <RiResetLeftFill />
            </button>
        </div>
    );
}

export default React.memo(DateRangeFilter);