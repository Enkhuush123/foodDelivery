"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { user } = useUser();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user) return;
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
    if (!user) return;
    setAddress(newAddress);
    localStorage.setItem("DeliveryAddress", newAddress);
  };
  const hasAddress = address.trim() !== "";
  return (
    <AddressContext.Provider
      value={{ address, hasAddress, saveAddress, setAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
