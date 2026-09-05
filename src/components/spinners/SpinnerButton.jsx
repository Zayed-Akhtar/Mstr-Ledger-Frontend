import React from 'react'

export default function SpinnerButton({
  size = 16,
  className = '',
  style = {},
  asButton = false,
  ...props
}) {
  const spinner = (
    <span
      className="spinner-border"
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        borderWidth: '2px',
        ...style,
      }}
    />
  )

  if (asButton) {
    return (
      <button
        type="button"
        className={`btn btn-primary ${className}`.trim()}
        disabled
        {...props}
      >
        {spinner}
        <span className="visually-hidden">Loading...</span>
      </button>
    )
  }

  return (
    <span
      className={`d-inline-flex align-items-center justify-content-center ${className}`.trim()}
      role="status"
      aria-live="polite"
      {...props}
    >
      {spinner}
    </span>
  )
}
