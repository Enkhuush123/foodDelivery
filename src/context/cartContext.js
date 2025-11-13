"use client";
import { createContext, useContext, useState } from "react";
import { useAddress } from "./addressContext";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { hasAddress } = useAddress();
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    if (!hasAddress) {
      alert("Please set your address before adding items to the cart.");
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
