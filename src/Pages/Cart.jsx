import React, { useState } from "react";
import { product } from "../../libs/items";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteProduct, UpdateAmount } from "../../Toolkit/useSlice";
export const Cart = ({ product }) => {
  let [amount, setAmount] = useState(0);
  return (
    <div className="flex items-center justify-start w-full my-1">
      <div className="w-[200px] border-solid border-[2px] border-[#04aed1] h-[200px]">
        <img src={product?.img} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex font-Roboto rounded-md shadow-md shadow-gray-500 ml-3 p-3 items-center justify-between w-full">
        <div className="w-10/12 ml-3">
          <h1 className="mb-2 font-Poppins text-xl">{product.title}</h1>
          <p className="text-sm font-medium w-8/12">
            &nbsp;&nbsp;&nbsp;{product?.desc}
          </p>
          <span className="text-xs font-Poppins ml-2 text-[#04aed1]">
            {product?.quantity} x ${product.price}
          </span>
        </div>
        <div className="flex items-end justify-end flex-col">
          <button
            onClick={deleteProduct}
            className="rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-200"
          >
            <MdDelete />
          </button>
          <div className="flex items-center justify-center mt-5">
            <button
              onClick={() => handleChange("+")}
              className="w-8 h-8 border-solid border-gray-400 border-[1px] rounded-full flex items-center justify-center text-xl mx-2"
            >
              +
            </button>
            <p className="text-sm mx-2">{product?.quantity}</p>
            <button
              onClick={() => handleChange("-")}
              className="w-8 h-8 border-solid border-gray-400 border-[1px] rounded-full flex items-center justify-center text-xl ml-2"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
