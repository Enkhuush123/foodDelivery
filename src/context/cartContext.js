"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAddress } from "./addressContext";
import { WebLogo } from "@/app/_icons/logo";
import { WebLogo02 } from "@/app/_icons/webIcon";
import { useUser } from "./userContext";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { hasAddress } = useAddress();
  const [cartItems, setCartItems] = useState([]);
  const [getLocation, setGetLocation] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (!hasAddress) {
      setGetLocation(true);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                totalPrice:
                  (cartItem.totalPrice + item.totalPrice) * cartItem.price,
              }
            : cartItem
        );
      } else {
        return [
          ...prev,
          { ...item, quantity: item.quantity, foodId: item._id },
        ];
      }
    });
  };
  const updateQuantity = (name, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {getLocation && (
        <div className="w-full fixed h-full flex justify-center items-center inset-0 z-50 bg-black/50 animate-in ">
          <div className=" w-[664px] h-80 bg-white flex flex-col justify-evenly items-center rounded-lg fixed animate-in   ">
            <p className="font-semibold text-2xl">
              Please select your delivery address!
            </p>
            <WebLogo02 />
            <button
              onClick={() => setGetLocation(false)}
              className="w-[132px] h-11 flex justify-center items-center bg-neutral-200 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
