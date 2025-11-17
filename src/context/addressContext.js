"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const saveAddress = localStorage.getItem("DeliveryAddress");
    if (saveAddress) {
      setAddress(saveAddress);
    }
  }, []);

  useEffect(() => {
    if (address) {
      localStorage.setItem("DeliveryAddress", address);
    }
  }, [address]);

  const saveAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem("DeliveryAddress", newAddress);
  };
  const hasAddress = address.trim() !== "";
  return (
    <AddressContext.Provider value={{ address, hasAddress, saveAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
