"use client";
import { useCart } from "../context/CartContext";

const CartPage = function () {
  const { cart, wishlist } = useCart();

  return (
    <section className="p-6">
      {/* Cart Section */}
      <h2 className="text-2xl font-bold text-green-600 mb-4">🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}

      {/* Wishlist Section */}
      <h2 className="text-2xl font-bold text-cyan-600 mt-10 mb-4">💖 Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CartPage;
