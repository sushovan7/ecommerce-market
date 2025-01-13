import React from "react";

function Button({ onClick, text, type, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="border flex items-center justify-center min-w-[200px] w-[50%] py-3 bg-black cursor-pointer text-white  border-black"
    >
      {text}
    </button>
  );
}

export default Button;
