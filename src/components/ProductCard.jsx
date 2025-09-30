"use client";

import Image from "next/image";

const ProductCard = function ({ product }) {
    return (
        <div className="flex flex-col items-center border-2 borer-blue-600 rounded-md p-4 shadow-xl">
            <img src={product.thumbnail} alt={`${product.title} image`} />                
            <h2 className="text-xl text-center text-blue-700 font-semibold mt-4">{product.title}</h2>
            <p className="text-center text-blue-600">{product.brand}</p>
            <p className="text-center text-green-600 my-2 font-semibold">{product.rating}⭐ out of 5</p>
            <p className="text-center">{product.price}$</p>
        </div>    
    );
}

export default ProductCard;