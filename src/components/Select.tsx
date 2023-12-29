import React from 'react'

const Select = ({ label, id, options, value, handler }) => {
  return (
    <div className="input">
      <label htmlFor={id}>
        {label}
      </label>
      <select 
        id={id}
        onChange={handler}
        value={value}
      >
        {options.map((opt, idx) => (
          <option key={`${id}-${idx}`} id={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select