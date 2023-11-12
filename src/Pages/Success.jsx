import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export const Success = () => {
  return (
    <div className="w-full bg-[#395079] h-[90vh] flex items-center flex-col justify-center">
        <Link to={'/'} className='h-12 cursor-pointer hover:bg-white group rounded-3xl flex items-center border-solid border-gray-200 border-[1px] w-40 mb-3 justify-center'>
            <MdOutlineKeyboardBackspace className='text-2xl group-hover:text-black text-white' />
        </Link>
      <div className="md:w-4/12 shadow-sm h-[300px] shadow-white/80 rounded-md relative mx-auto bg-white xs:w-full flex items-center flex-col justify-center">
        <div className="font-Poppins absolute top-[-50%] left-[40%] w-16 h-16 rounded-full flex items-center justify-center bg-green-500 text-white">
          <TiTick className={"ml-1 text-5xl"} />
        </div>
        <h1 className="text-5xl font-Poppins my-5">Thank you!</h1>
        <p className="text-md text-center font-Poppins">
          Your details has been submitted successfully Thanks!
        </p>
      </div>
    </div>
  );
}
