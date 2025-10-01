"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert("Product added to cart");
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
    alert("Product added to wishlist");
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, addToWishlist }}>
      {children}
    </CartContext.Provider>
  );

};

// custom hook
export const useCart = () => useContext(CartContext);
