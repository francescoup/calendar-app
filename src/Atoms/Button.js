import React from "react";

const Button = ({ text, className, onclick, icon }) => {
  return (
    <button onClick={() => onclick(text)} className={className}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
