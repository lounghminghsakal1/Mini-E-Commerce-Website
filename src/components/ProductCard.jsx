"use client";
import Link from "next/link";

const ProductCard = function ({ product }) {
    return (
            <Link href={`/products/${product.id}`} className="flex flex-col items-center border-2 border-pink-700 rounded-md p-4 shadow-xl hover:shadow-[0_0_10px_red]">
                <img src={product.thumbnail} alt={`${product.title} image`} />                
                <h2 className="text-xl text-center text-emerald-700 font-semibold mt-4">{product.title}</h2>
                <p className="text-center text-green-600 pt-2">{product.brand}</p>
                <p className="text-center text-green-600 my-2 font-semibold">{product.rating}⭐ out of 5</p>
                <p className="text-center text-gray-800">{product.price}$</p>
            </Link>   
    );
}

export default ProductCard;