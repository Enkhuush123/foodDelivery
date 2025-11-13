"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebLogo } from "../_icons/logo";
export const Tab = () => {
  return (
    <Tabs defaultValue="Cart" className=" flex gap-20">
      <TabsList className={`flex`}>
        <TabsTrigger value="Cart">Cart</TabsTrigger>
        <TabsTrigger value="Order">Order</TabsTrigger>
      </TabsList>
      <TabsContent value="Cart">
        <div className="w-[471px] bg-white h-[540px] rounded-lg ">
          <div className="flex flex-col gap-2">
            <div className="flex p-5">
              <p className="font-semibold text-2xl text-neutral-400">My cart</p>
            </div>
            <div className="flex justify-center items-center ">
              <div className="bg-neutral-200 gap-2 rounded-lg w-[439px] h-[182px] flex flex-col justify-center items-center ">
                <WebLogo />
                <p className="font-bold text-sm">Your cart is empty</p>
                <p className="text-center">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};
