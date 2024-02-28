import React from 'react';
import "./Button.css";

function Button({text,onClick,backgroundColor,color,borderColor}) {

  return (
    <>
        <button onClick={onClick}  style={{backgroundColor:backgroundColor,border:`2px solid ${borderColor}`,color:color}} >{text}</button>
    </>
  )
}

export default Button