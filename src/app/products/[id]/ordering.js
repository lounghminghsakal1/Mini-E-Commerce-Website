"use client";
import { useCart } from "@/app/context/CartContext";

const OrderProducts = function ({ product }) {
    
    const { addToCart, addToWishlist } = useCart();
    
    return(
    <div className="flex justify-around my-4">
        <button className="bg-green-600 p-2 rounded-md cursor-pointer text-white" onClick={() => {                
            alert("Product added to cart");
            addToCart(product)}}>Add to Cart</button>         
       <button className="bg-cyan-600 p-2 rounded-md cursor-pointer text-white" onClick={() => {         
            alert("product added to wishlist");
            addToWishlist(product)}}>Add to Wish list</button>
    </div>
    );
}

export default OrderProducts;