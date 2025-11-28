"use client";

import { UserIcon } from "lucide-react";
import { WebLogo } from "../_icons/logo";
import { Navigation } from "../_icons/navigationIcon";
import { RightIcon } from "../_icons/rightIcon";
import { ShopIcon } from "../_icons/shopIcon";
import { Cart } from "../_components/cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddress } from "@/context/addressContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { set } from "date-fns";

export const HomeHeader = () => {
  const { address, saveAddress } = useAddress();
  const [addressInput, setAddressInput] = useState(address);
  const { user, logout } = useUser();
  const [profile, setProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [auth, setAuth] = useState(false);
  const [addressBack, setAddressBack] = useState("");

  const router = useRouter();

  // const getData = async () => {
  //   if (!user) return;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //     },
  //   };
  //   const data = await fetch(`http://localhost:9000/auth/refresh`, options);
  //   const jsonData = await data.json();
  //   setAddressBack(jsonData.address || "");
  //   saveAddress(jsonData.address || "");
  //   console.log(jsonData, "ehehe");
  // };

  const HandleAddress = async (e) => {
    e.preventDefault();
    saveAddress(addressInput);
    if (!user) {
      setAuth(true);
      setOpenAddress(false);
      return;
    }

    try {
      const res = await fetch(`https://database-4-5ry8.onrender.com/auth/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user._id, address: addressInput }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log("Failed to update address:", data);
        return;
      }

      setAddressBack(data.address);
      saveAddress(data.address);
      setOpenAddress(false);
    } catch (error) {
      console.error("Failed to update address:", error);
    }

    saveAddress(addressInput);
  };
  const handleAddressClick = () => {
    if (!user) {
      setAuth(true);
    } else {
      setOpenAddress(false);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="w-full max-sm:w-full bg-black h-[172px] flex items-center justify-between p-5 ">
      <div className="flex flex-row items-center gap-2 ">
        <WebLogo />
        <div className="flex flex-col">
          <p className="text-white flex items-center">
            Nom <span className="text-red-500">Nom</span>
          </p>
          <p className="text-white">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-2  ">
        <Dialog open={openAddress} onOpenChange={setOpenAddress}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddressClick}
              className={`className="w-[251px] h-9 bg-white flex items-center rounded-full justify-center gap-2 cursor-pointer `}
              variant="outline"
            >
              {" "}
              <Navigation />
              <span className="text-red-500 font-normal text-xs">
                Delivery address:
              </span>
              <span className="font-normal text-neutral-400 text-xs">
                {addressBack ? addressBack : "Add location"}
              </span>
              <RightIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] h-[308px] flex flex-col gap-6 p-5 justify-between">
            <DialogHeader>
              <DialogTitle>Deliver address</DialogTitle>
            </DialogHeader>
            <textarea
              className="w-[432px] h-28 border p-2 "
              placeholder="Please provide specific address details such as building number, entrance, and apartment number"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            ></textarea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={HandleAddress}>Deliver here</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={auth} onOpenChange={setAuth}>
          <DialogContent className="sm:max-w-[360px] p-5 flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Please log in first</DialogTitle>
            </DialogHeader>

            <p>You must log in or sign up to add delivery address.</p>

            <div className="flex justify-between">
              <Button onClick={() => router.push("/login")} className="w-[45%]">
                Login
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="w-[45%]"
              >
                Sign Up
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div>
          <Cart />
        </div>

        <div>
          {!user ? (
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/login")}
                className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-blue-500"> Log in</p>
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-red-500"> Sign up</p>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setProfile(!profile)}
                className="w-9 h-9 bg-white flex items-center justify-center rounded-full cursor-pointer "
              >
                <UserIcon />
              </button>
              {profile && (
                <div className="w-[188px] h-[104px] bg-white rounded-md absolute right-5 flex  flex-col  gap-5 items-center justify-center  ">
                  {user.email}
                  <button
                    onClick={logout}
                    className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center"
                  >
                    <p className="text-red-500"> Log out</p>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
