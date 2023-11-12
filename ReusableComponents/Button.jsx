import React from "react";

export const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? "bg-gray-500" : "bg-gray-800"
      } p-3  text-white text-sm rounded-md my-2 hover:bg-gray-700 w-11/12 mx-auto disabled:bg-gray-600 transition ease-linear duration-300 cursor-pointer`}
    >
      {label}
    </button>
  );
};
