import React from 'react'

export default function DefaultSpinner({ size = 52, color = 'success', className = '', style = {} }) {
    return (
        <div
            className={`d-flex justify-content-center align-items-center ${className}`.trim()}
            style={{ ...style }}
            aria-live="polite"
            aria-label="Loading"
        >
            <div
                className={`spinner-border text-${color}`}
                role="status"
                style={{ width: size, height: size }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
