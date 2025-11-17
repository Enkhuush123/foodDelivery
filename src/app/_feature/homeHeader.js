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
import { useState } from "react";
import { useRouter } from "next/navigation";

export const HomeHeader = () => {
  const { address, saveAddress } = useAddress();
  const [addressInput, setAddressInput] = useState(address);
  const [user, setUser] = useState(false);

  const router = useRouter();

  const HandleAddress = (e) => {
    e.preventDefault();
    saveAddress(addressInput);
  };

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
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                className={`className="w-[251px] h-9 bg-white flex items-center rounded-full justify-center gap-2 cursor-pointer `}
                variant="outline"
              >
                {" "}
                <Navigation />
                <span className="text-red-500 font-normal text-xs">
                  Delivery address:
                </span>
                <span className="font-normal text-neutral-400 text-xs">
                  {address ? address : "Add location"}
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
          </form>
        </Dialog>

        <div>
          <Cart />
        </div>
        <div>
          <button
            onClick={() => setUser(!user)}
            className={`w-9 h-9 bg-white flex items-center justify-center rounded-full ${
              setUser ? "bg-red-500" : "bg-white"
            } `}
          >
            <UserIcon />
          </button>
          {user && (
            <div className="w-[188px] h-[104px] bg-white absolute right-5 rounded-lg top-30 justify-center items-center flex gap-2">
              <button
                onClick={() => router.push("/login")}
                className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="text-blue-500"> Log in</p>
              </button>
              <button className="w-20 h-9 p-1 bg-neutral-200 rounded-full flex justify-center items-center">
                <p className="text-red-500"> Sign up</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
