import React from 'react'
import { Product } from './Product'
import { product } from '../../libs/items'
import useCartModalHook from '../../Hooks/useCartModalHook'

export const Products = () => {
  let cartModal = useCartModalHook()
  return (
    <div className={`${cartModal.open ? 'md:w-9/12' :'xs:w-full'} flex-col h-full flex items-center justify-start transition duration-300 ease-linear`}>
      <h1 className="xs:text-3xl md:text-6xl font-Agbalumo xs:mb-3 md:mb-5 underline fot-bold">
        Products
      </h1>
      <div
        className={`${
          cartModal.open ? "md:grid-cols-4" : "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
        } w-full grid py-8 gap-6 xs:grid-cols-1`}
      >
        {product.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
