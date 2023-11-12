import React from 'react'
import { Cart } from './Cart';
import { TotalProducts } from '../../components/TotalProducts';
import { useSelector } from 'react-redux';
import { BsHandbag } from 'react-icons/bs';
export const Carts = () => {
    let { products}  = useSelector((state) => state.user);
  return (
    <div className="flex items-start justify-start flex-col">
        <h1 className='flex items-center justify-start font-Roboto text-3xl my-3 ml-10'>Products in Your Cart <BsHandbag className='text-3xl ml-2' /></h1>
      <div className="w-full flex items-start justify-between relative">
        <div className="w-11/12 mr-10 flex items-start justify-start flex-col">
          {products.length ? products?.map((item) => (
            <Cart key={item.id} product={item} />
          )) : <>Your Cart is empty!</>}
        </div>
        <TotalProducts />
      </div>
    </div>
  );
}
