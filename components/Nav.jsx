import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import useRegisterHook from "../Hooks/useRegisterHook";
import useLoginHook from "../Hooks/useLoginHook";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from 'react-icons/ti'
import useCartModalHook from "../Hooks/useCartModalHook";
import { LOGOUT } from "../Toolkit/useSlice";
import { CiShoppingCart } from 'react-icons/ci'
import { useMediaQuery } from "react-responsive";
const Nav = () => {
  let { username, profile,quantity} = useSelector((state) => state.user)
  let [scroll,setScroll] = useState(0)
  let cartModal = useCartModalHook();
  let register = useRegisterHook()
  let login = useLoginHook()
  let dispatcher = useDispatch()
  let Logout = () => {
    dispatcher(LOGOUT())
    login.onReload()
  }
  useEffect(() => {
      let handleScroll = () => {
        if(window.scrollY > 100){
          setScroll(true)
        }else{
          setScroll(false)
        }
      }
      window.addEventListener('scroll',handleScroll)

      return () => window.removeEventListener('scroll',handleScroll)
  },[scroll])
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 490px)",
  });
  let handleOpener = () => {
    if(isDesktopOrLaptop) cartModal.onOpen()
  }
  return (
    <div
      className={`${
        cartModal.open ? "md:w-9/12" : "md:w-full"
      } flex items-center xs:px-2 md:px-0 justify-between py-2 ${
        scroll ? "sticky top-0 bg-white shadow-md shadow-black/10" : "relative"
      }`}
    >
      <ul
        className={"flex items-center justify-start md:flex-row cursor-pointer"}
      >
        <Link
          to={"/"}
          className="font-Agbalumo xs:text-md md:text-2xl  cursor-pointer hover:shadow-black/40 hover:shadow-md "
        >
          Eccomerce-App
        </Link>
        {username && (
          <h1 className="p-2 xs:mt-1 md:mt-0 xs:text-[9px] w-fit md:text-xs border-solid flex items-center justify-start border-[1px] border-[#009866] ml-2 text-[#009866] font-Roboto bg-[#e0fff5] rounded-3xl">
            Logged as {username} <TiTick className={"ml-1"} />
          </h1>
        )}
      </ul>
      <>
        {username && login.reload ? (
          <ul className="flex items-center list-none justify-start">
            <button
              onClick={handleOpener}
              className={`${
                quantity ? "border-[#009866] scale-[1.04]" : "border-gray-300 scale-100"
              } xs:w-6 md:w-8 xs:h-6 md:h-8 relative rounded-full flex items-center transition-all ease-linear duration-300 justify-center bg-gray-100 mr-2 border-solid  border-[1px]`}
            >
              <CiShoppingCart />
              <span className="absolute -top-2 font-medium -right-1 w-4 h-4 rounded-full flex items-center justify-center bg-[#009866] text-white text-xs font-Roboto">
                {quantity}
              </span>
            </button>
            <div className="xs:w-6 md:w-8 xs:h-6 md:h-8 rounded-full border-solid border-[1px] border-gray-300 bg-gray-50">
              <img
                className="w-full h-full object-cover rounded-full"
                src={
                  profile ||
                  `https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png`
                }
                alt=""
              />
            </div>
            <button
              onClick={Logout}
              className={`ml-2 mx-1 tracking-wider relative before:absolute before:bottom-0 before:w-0 text-[13px] before:left-0 transition-all ease-in-out duration-500 before:h-[2px] before:rounded-md before:bg-gray-800 before:content-[""] hover:before:w-full`}
            >
              Logout
            </button>
          </ul>
        ) : (
          <ul className="flex items-center justify-start">
            <button
              onClick={register.onOpen}
              className={`mr-2 tracking-wider relative before:absolute before:bottom-0 before:w-0 text-[13px] before:left-0 transition-all ease-in-out duration-500 before:h-[2px] before:rounded-md before:bg-gray-800 before:content-[""] hover:before:w-full`}
            >
              Register
            </button>
            <button
              onClick={login.onOpen}
              className={`mx-2 tracking-wider relative before:absolute before:bottom-0 before:w-0 text-[13px] before:left-0 transition-all ease-in-out duration-500 before:h-[2px] before:rounded-md before:bg-gray-800 before:content-[""] hover:before:w-full`}
            >
              Login
            </button>
          </ul>
        )}
      </>
    </div>
  );
};

export default Nav;
