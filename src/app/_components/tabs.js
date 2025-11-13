"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebLogo } from "../_icons/logo";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
export const Tab = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const TotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <Tabs defaultValue="Cart" className=" flex gap-20">
      <TabsList className={`flex`}>
        <TabsTrigger value="Cart">Cart</TabsTrigger>
        <TabsTrigger value="Order">Order</TabsTrigger>
      </TabsList>
      <TabsContent value="Cart">
        <div className="w-[471px] bg-white h-[540px] rounded-lg p-5 flex flex-col justify-between">
          {/* CART ITEMS */}
          <div className="flex flex-col gap-3 ">
            {cartItems.length === 0 ? (
              <div className="bg-neutral-200 gap-2 rounded-lg w-full h-[182px] flex flex-col justify-center items-center">
                <WebLogo />
                <p className="font-bold text-sm">Your cart is empty</p>
                <p className="text-center text-xs text-gray-600">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
                </p>
              </div>
            ) : (
              cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.img || "/food.png"}
                      width={50}
                      height={50}
                      alt={item.name}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity}x {item.price}₮
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 text-xs hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* CART FOOTER */}
          {cartItems.length > 0 && (
            <div className="flex flex-col gap-3 border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>{TotalPrice.toLocaleString()}₮</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};
