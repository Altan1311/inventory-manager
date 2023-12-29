import React from 'react'

import './Input.css'

const Input = ({ label, id, size, value, handler }) => {
  return (
    <div className="input">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={`input-${size}`}
        value={value}
        onChange={handler}
      />
    </div>
  )
}

export default Input