import React from 'react';
import "./Input.css";

function Input({label,type,id,onInput,value,placeholder,minLength}) {
  return (
    <div className='Input-wrapper'>
        <label htmlFor={id}>{label}</label>
        <input type={type} onInput={onInput} id={id} value={value} placeholder={placeholder} minLength={minLength}></input>
    </div>
  )
}

export default Input