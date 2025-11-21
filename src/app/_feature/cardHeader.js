"use client";

import { useEffect, useState } from "react";
import { FoodCards } from "../_components/foodCard";
import { Arrow } from "../_icons/arrows";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

import { Profile } from "./profile";
import { useUser } from "@/context/userContext";

export const CardHeader = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [profile, setProfile] = useState(false);
  const { user, logout } = useUser();

  const getData = async () => {
    const res = await fetch("http://localhost:9000/foodOrder", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const data = await res.json();
    setFoodOrders(data);
    setFilteredOrders(data);
    console.log(filteredOrders, "gg");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!date) {
      setFilteredOrders(foodOrders);
      return;
    }

    const filtered = foodOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getFullYear() === date.getFullYear() &&
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getDate() === date.getDate()
      );
    });

    setFilteredOrders(filtered);
  }, [date, foodOrders]);

  const toggleSelect = (orderId) => {
    setSelectedOrder((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrder.length === foodOrders.length) {
      setSelectedOrder([]);
    } else {
      setSelectedOrder(filteredOrders.map((order) => order._id));
    }
  };
  const changeStatus = async (newStatus) => {
    for (const orderId of selectedOrder) {
      await fetch(`http://localhost:9000/foodOrder/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    }

    setFoodOrders((prevOrders) =>
      prevOrders.map((order) =>
        selectedOrder.includes(order._id)
          ? { ...order, status: newStatus }
          : order
      )
    );

    setOpen(false);
    setSelectedOrder([]);
  };
  return (
    <div className="w-full max-w-[1200px] p-5  gap-5 flex flex-col rounded-md">
      <div className="w-full flex  justify-end items-end flex-col gap-2 ">
        <button
          onClick={() => setProfile(!profile)}
          className="w-full flex   justify-end "
        >
          <img
            src="/enhush.jpg"
            alt="enhush"
            className="w-9 h-9 object-cover rounded-full"
          />
        </button>
        {profile && (
          <div className="w-[188px] h-[104px] bg-white rounded-md   flex  flex-col  gap-5 items-center justify-center  ">
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
      <div className="rounded-md bg-white w-full max-w-[1200px]">
        <div>
          <div className=" flex justify-between shadow-sm p-5   ">
            <div className=" flex flex-col items-center">
              <p className="font-bold text-xl">Orders</p>
              <p>{filteredOrders.length} items</p>
            </div>
            <div className="flex pr-4 items-center gap-3">
              <div className="w-[300px] h-9 rounded-full shadow-sm flex justify-center items-center">
                <input
                  type="date"
                  value={date ? date.toLocaleDateString() : ""}
                  onClick={() => setDateOpen(!dateOpen)}
                  readOnly
                  className="border p-2 rounded"
                  placeholder="Select date"
                />
                {dateOpen && (
                  <div className="absolute z-50 mt-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setDateOpen(false);
                      }}
                      className="border rounded"
                    />
                  </div>
                )}
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    disabled={selectedOrder.length === 0}
                    className={` p-5 h-9 rounded-full shadow-sm flex items-center justify-center ${
                      selectedOrder.length > 0
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2 ">
                      <p>Change delivery state</p>
                      {selectedOrder.length > 0 && (
                        <div className="bg-white  p-2 flex items-center justify-center h-5 rounded-full text-black">
                          {selectedOrder.length > 0 &&
                            `${selectedOrder.length}`}
                        </div>
                      )}
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] flex p-5 gap-5 flex-col">
                  <DialogHeader>
                    <DialogTitle>Change Delivery State</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-row p-5 gap-5">
                    <button
                      onClick={() => changeStatus("DELIVERED")}
                      className=" bg-neutral-100 flex justify-center items-center rounded-full w-[94px] h-8"
                    >
                      <p>Delivered</p>
                    </button>
                    <button
                      onClick={() => changeStatus("PENDING")}
                      className=" bg-neutral-100 flex justify-center items-center rounded-full w-[94px] h-8"
                    >
                      <p>Pending</p>
                    </button>
                    <button
                      onClick={() => changeStatus("CANCELLED")}
                      className=" bg-neutral-100 flex justify-center items-center rounded-full w-[94px] h-8"
                    >
                      <p>Cancelled</p>
                    </button>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="h-14 flex justify-between shadow-sm items-center p-5 bg-neutral-300">
            <div>
              <input
                onChange={toggleSelectAll}
                type="checkbox"
                checked={
                  selectedOrder.length > 0 &&
                  selectedOrder.length === foodOrders.length
                }
              ></input>
            </div>
            <div className="w-14 h-[52px] flex items-center justify-center">
              <p>№</p>
            </div>
            <div className="w-[213px] h-[52px] flex items-center  justify-center ">
              <p>Customer</p>
            </div>
            <div className="w-40 h-[52px] flex items-center justify-center pr-8 ">
              <p>Food</p>
            </div>
            <div className="flex items-center gap-5 w-40 h-[52px] justify-center">
              <p>Date</p> <Arrow />
            </div>
            <div className="w-40 h-[52px] flex items-center justify-center">
              <p>Total</p>
            </div>
            <div className="w-[213px] h-[52px] flex items-center justify-center">
              <p>Delivery Address</p>
            </div>
            <div className="flex items-center gap-5 w-40 h-[52px] justify-center ">
              <p>Delivery state</p> <Arrow />
            </div>
          </div>
          <div>
            {filteredOrders.map((order, index) => (
              <FoodCards
                key={order._id}
                foods={order.foodOrderItems}
                index={index + 1}
                email={order.user.email}
                foodNumber={order.foodOrderItems.length}
                date={order.createdAt}
                totalPrice={order.totalPrice}
                address={order.user.address}
                updateFoodId={order._id}
                isSelected={selectedOrder.includes(order._id)}
                toggleSelect={() => toggleSelect(order._id)}
                status={order.status}
                getData={getData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
