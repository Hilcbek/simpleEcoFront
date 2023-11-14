import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DeleteProduct, Reset, UpdateAmount } from "../../Toolkit/useSlice";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FaCcAmazonPay } from "react-icons/fa";
import useCartModalHook from "../../Hooks/useCartModalHook";
import { Link } from "react-router-dom";
import { baseURL } from "../../libs/Axios";
import axios from "axios";
import toast from "react-hot-toast";
export const CartModal = ({ open, disabled }) => {
  let cartModal = useCartModalHook();
  let[ loading,setLoading] = useState(false)
  let [ex, setEx] = useState();
  let [openModal, setOpen] = useState(open);
  let {username} = useSelector(state => state.user)
  useEffect(() => {
    setOpen(open);
  }, [open]);
  let dispatcher = useDispatch();
  let { products, total,id } = useSelector((state) => state.user);
  let handleChange = (sign, product) => {
    dispatcher(UpdateAmount({ ...product, sign }));
  };
  let deleteProduct = (product) => {
    dispatcher(DeleteProduct(product.id));
  };
  let handleOnClose = useCallback(() => {
    if (disabled) return;
    setOpen(false);
    setTimeout(() => {
      cartModal.onClose();
    }, 100);
  }, [disabled]);
  let resetCart = () => {
    dispatcher(Reset());
  };
  let handleCheckout =  async () => {
    if(!username) {
      toast.error(`to checkout first login`)
      return;
    };
    try {
      setLoading(true)
        let res = await baseURL.post(
          "/stripe/create-checkout-session",
          {
            products,
            id,
          }
        );
        if(res.data){
          window.location.href = res.data.url
          dispatcher(Reset());
        }
    } catch (error) {
      toast.error.log(error.response.data)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div
      className={`${
        openModal ? "right-0" : "right-[-200%]"
      } max-h-[100vh] font-Roboto p-3 h-full slide bg-[aliceblue] flex-col shadow-md shadow-black/30 flex items-center justify-start z-[999] xs:w-full xs:px-5 px-2 md:w-3/12 fixed top-0`}
    >
      <div className="w-full flex items-center justify-end">
        <li
          onClick={handleOnClose}
          className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200 cursor-pointer"
        >
          <AiOutlineClose />
        </li>
      </div>
      <h1 className="font-Poppins text-3xl my-2 font-light underline">
        Products in your cart!
      </h1>
      <div className="flex items-center justify-start flex-col scroller max-h-[70%] overflow-y-scroll carts mt-2">
        {products.length > 0 ? (
          products?.map((product, idx) => (
            <div key={idx} className="flex items-start justify-start">
              <div className="w-[120px] h-[130px] bg-gray-50 mb-2 rounded-md border-solid border-gray-300 border-[1px] transition-all ease-linear duration-300 cursor-pointer">
                <img
                  src={product?.img}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-11/12 ml-1">
                <div className="w-full flex items-center justify-center">
                  <p className="text-[12px] w-[98%] font-medium">
                    &nbsp;&nbsp;
                    {product.id === ex
                      ? String(product?.desc).substring(0, product.desc.length)
                      : String(product?.desc).substring(0, 140).concat("...")}
                    {product.id === ex ? (
                      <span
                        onClick={() => setEx("")}
                        className="hover:italic transition ml-1 duration-200 cursor-pointer hover:underline text-[#04aed1]"
                      >
                        see less
                      </span>
                    ) : (
                      <span
                        onClick={() => setEx(product.id)}
                        className="hover:italic transition ml-1 duration-200 cursor-pointer hover:underline text-[#04aed1]"
                      >
                        see more
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => deleteProduct(product)}
                    className="rounded-full w-6 h-6 flex group items-center hover:bg-rose-100 justify-center border-solid border-transparent border-[1px] hover:border-rose-600"
                  >
                    <MdDelete className="group-hover:text-rose-600 transition duration-300" />
                  </button>
                </div>
                <div className="w-full flex mt-2 items-center justify-between">
                  <span className="text-xs text-[#04aed1]">
                    {product?.quantity} * {product?.price}
                  </span>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleChange("+", product)}
                      className="w-5 h-5 border-solid border-gray-400 border-[1px] rounded-full flex items-center justify-center text-sm mx-1"
                    >
                      +
                    </button>
                    <p className="text-sm mx-2">{product?.quantity}</p>
                    <button
                      onClick={() => handleChange("-", product)}
                      className="w-5 h-5 border-solid border-gray-400 border-[1px] rounded-full flex items-center justify-center text-sm ml-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Empty cart!</h1>
        )}
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-between w-11/12 mx-auto p-2 rounded-md bg-gray-50 shadow-md">
          <h1 className="text-xs">Total</h1>
          <span className="underline text-sm italic text-[#04aed1]">
            ${Number(total).toFixed(2)}
          </span>
        </div>
        {products && (
          <div className="flex items-center justify-center flex-col w-11/12 mx-auto mt-3">
            <button
              disabled={loading}
              onClick={handleCheckout}
              className={`${
                loading ? "bg-[#98e3f3]" : "bg-[#04b0d7]"
              } p-3 flex items-center justify-center w-full text-white rounded-md mt-2 cursor-pointer font-normal text-sm hover:bg-[#04aed1] transition duration-300`}
            >
              {loading ? "Loading..." : "Checkout"}
              <FaCcAmazonPay className="ml-1" />
            </button>
            <button
              onClick={resetCart}
              className="p-3 flex items-center justify-center bg-rose-500 w-full text-white rounded-md mt-2 cursor-pointer font-normal text-sm hover:bg-rose-600 transition duration-300"
            >
              Reset
              <MdDelete className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
