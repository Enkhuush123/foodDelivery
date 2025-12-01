"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebLogo } from "../_icons/logo";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { NegativeIcon } from "../_icons/negativeIcon";
import { PlusBlack } from "../_icons/plusBlackIcon";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { useAddress } from "@/context/addressContext";
import { FoodIcon } from "../_icons/foodIcon";
import { DateIcon } from "../_icons/dateIcon";
import { useUser } from "@/context/userContext";
import { LocIcon } from "../_icons/locIcon";
export const Tab = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { address, setAddress } = useAddress();
  const [orders, setOrders] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { user } = useUser();
  console.log(cartItems, "cart");

  const TotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 1000;

  const plus = TotalPrice + shipping;

  const handleCheckout = async () => {
    if (!address || address.trim() === "") {
      alert("please enter your address first");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/foodOrder/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user._id,
          totalPrice: TotalPrice + shipping,
          address: address,
          foodOrderItems: cartItems.map((item) => ({
            food: item.foodId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("failed to create order");
      }
      const newOrder = await res.json();
      setOrders([newOrder, ...orders]);
      getData();
      clearCart();
    } catch (err) {
      console.log(err, "ggg");
    }
  };
  const getData = async () => {
    const data = await fetch(`${backend_url}/foodOrder/${user._id}`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const json = await data.json();
    setFoodOrders(json);
    console.log(json, "gg");
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <Tabs defaultValue="Cart" className=" flex gap-20">
      <TabsList className={`flex`}>
        <TabsTrigger value="Cart">Cart</TabsTrigger>
        <TabsTrigger value="Order">Order</TabsTrigger>
      </TabsList>
      <TabsContent className={`flex gap-10 flex-col`} value="Cart">
        <div className="w-[471px] bg-white  rounded-lg p-5 gap- flex flex-col ">
          <div className="font-semibold text-2xl text-neutral-500">My cart</div>
          <div className="flex flex-col gap-15  ">
            {cartItems.length === 0 ? (
              <div className="bg-neutral-200 gap-2 rounded-lg w-full h-[182px] flex flex-col justify-center items-center">
                <WebLogo />
                <p className="font-bold text-sm">Your cart is empty</p>
                <p className="text-center text-xs text-gray-600 max-w-[343px]">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
                </p>
              </div>
            ) : (
              cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex w-[439px]   items-center border-b  gap-3"
                >
                  <div className="flex w-[124px] h-30 gap-3 items-center relative">
                    <Image
                      src={item.img || "/food.png"}
                      width={100}
                      height={100}
                      alt={item.name}
                      className="rounded-md object-cover
                      w-full h-full
                      "
                    />
                  </div>
                  <div className="w-[305px] flex flex-col p-5 gap-5  ">
                    <div className="flex">
                      <div>
                        <p className="font-bold text-base text-red-500">
                          {item.name}
                        </p>
                        <p className="font-normal text-xs">
                          {item.ingredients}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-500 border h-9 w-9 border-red-500 rounded-full  text-xs hover:text-red-400"
                        >
                          X
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-5 items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.name,
                              item.quantity > 1 ? item.quantity - 1 : 1
                            )
                          }
                          className="w-11 h-11 bg-white border rounded-full flex items-center justify-center"
                        >
                          <NegativeIcon />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() =>
                            updateQuantity(item.name, item.quantity + 1)
                          }
                          className="w-11 h-11 bg-white border rounded-full flex justify-center items-center"
                        >
                          {" "}
                          <PlusBlack />
                        </button>{" "}
                      </div>
                      <p className="text-base font-bold">
                        {item.price * item.quantity}₮
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base text-neutral-400">
                Delivery info
              </p>
              <textarea
                className="w-[439px] h-[60px] border p-1"
                placeholder="Please complete your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        {cartItems.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-dashed border-b border-black pb-5">
                <div className="flex justify-between">
                  <p className="text-neutral-400 ">Items</p>
                  <p className="font-bold text-2xl">-MNT</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral-400">Shipping</p>
                  <p className="font-bold text-2xl">-MNT</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between w-[421px]">
                  <p className="text-neutral-400">Total</p>
                  <p className="font-bold text-2xl">-MNT</p>
                </div>
                <div>
                  <button
                    onClick={handleCheckout}
                    className="w-[429px] h-11 rounded-full bg-red-500 text-white"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
        {cartItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-dashed border-b border-black pb-5">
                <div className="flex justify-between">
                  <p className="text-neutral-400 ">Items</p>
                  <p className="font-bold text-2xl">{TotalPrice}MNT</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral-400">Shipping</p>
                  <p className="font-bold text-2xl">{shipping}MNT</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className={`w-[429px]`}>
              <div className="flex flex-col gap-5 w-[421px] ">
                <div className="flex justify-between w-[429px] ">
                  <p className="text-neutral-400">Total</p>
                  <p className="font-bold text-2xl">{plus}MNT</p>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-[429px] h-11 rounded-full bg-red-500 text-white"
                >
                  Checkout
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      </TabsContent>
      <TabsContent className={`flex gap-10 flex-col`} value="Order">
        <div className="w-[471px] bg-white  rounded-lg p-5 gap-5 flex flex-col ">
          <div className="font-semibold text-2xl">
            {" "}
            <p>Order history</p>
          </div>
          {foodOrders.length === 0 ? (
            <div className="bg-neutral-200 gap-2 rounded-lg w-full h-[182px] flex flex-col justify-center items-center">
              <WebLogo />
              <p className="font-bold text-sm">No Orders Yet?</p>
              <p className="text-center text-xs text-gray-600 max-w-[343px]">
                🍕 "You haven't placed any orders yet. Start exploring our menu
                and satisfy your cravings!"
              </p>
            </div>
          ) : (
            foodOrders.map((items, index) => (
              <div key={index} className="flex gap-3 flex-col p-1">
                <div className="flex justify-between">
                  <p>{items.totalPrice}MNT</p>
                  <div className="h-7 p-2 border flex items-center justify-between rounded-full ">
                    <p className="font-semibold text-xs">{items.status}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    {items.foodOrderItems.map((foodItem, i) => (
                      <div
                        className="flex justify-between items-center "
                        key={i}
                      >
                        {" "}
                        <div className="flex items-center gap-3">
                          <FoodIcon />
                          <p>{foodItem.food?.foodName}</p>
                        </div>
                        <p>{foodItem.quantity}x</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <DateIcon />
                    <p>
                      {new Date(items.createdAt).toLocaleDateString(
                        "en-US",
                        {}
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <LocIcon /> {items.address}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
