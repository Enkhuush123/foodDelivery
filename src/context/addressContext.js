"use client";

import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");

  const saveAddress = (newAddress) => {
    setAddress(newAddress);
  };
  const hasAddress = address.trim() !== "";
  return (
    <AddressContext.Provider value={{ address, hasAddress, saveAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
