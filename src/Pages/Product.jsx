import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProdct } from "../../Toolkit/useSlice";
import { CartModal } from "../Modal/CartModal";
import useCartModalHook from "../../Hooks/useCartModalHook";

export const Product = ({ product }) => {
  let [quantity, setQuantity] = useState(1);
  let dispatcher = useDispatch();
  let cartModal = useCartModalHook();
  let addToCart = () => {
    dispatcher(AddProdct({ ...product, quantity }));
    cartModal.onOpen()
  };
  return (
    <div className="p-1 xs:mb-4 border-solid border-[1px] md:border-transparent xs:border-gray-100 lg:mb-0 flex items-center shadow-md group shadow-black/10 hover:shadow-gray-400 transition duration-300 cursor-pointer rounded-md justify-center flex-col">
      <div className="w-[160px] h-[160px]">
        <img
          className="w-full h-full object-contain"
          src={product.img}
          alt=""
        />
      </div>
      <h1 className="text-center text-[17px] group-hover:underline mt-3 font-bold font-Roboto">
        {product.title}
      </h1>
      <p className="text-xs text-center font-Roboto font-normal w-11/12 my-1 mx-auto">
        {String(product.desc).substring(0, 110)}
      </p>
      <p className="my-2 font-semibold tracking-wider text-sm font-Roboto underline decoration-slate-600">
        ${product.price}
      </p>
      <button
        onClick={addToCart}
        className="p-1 hover:bg-gray-800 hover:text-white transition duration-300 rounded-3xl border-solid font-Roboto border-gray-500 border-[2px] px-3 font-semibold text-xs my-1"
      >
        Add to Cart
      </button>
    </div>
  );
};
