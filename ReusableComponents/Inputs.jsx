import React from "react";

export const Inputs = ({ register, label, type, errors, id, required }) => {
  return (
    <div className="w-full my-1 relative">
      <input
        id={id}
        {...register(id, { required })}
        type={type || "text"}
        className={`
        ${errors[id] ? "border-rose-500" : "border-gray-300"}
      p-4 peer text-xs w-full rounded-md border-solid  border-[1px] outline-none
      `}
      />
      <label
        className={`
        bg-white peer-focus:text-gray-900 text-xs absolute top-1 left-2 peer-focus:-translate-y-3 transition ease-in-out duration-300
       ${errors[id] ? "-translate-y-3" : "translate-y-0"}
       ${errors[id] ? "text-rose-500" : "text-gray-500"}
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
//
//
//
