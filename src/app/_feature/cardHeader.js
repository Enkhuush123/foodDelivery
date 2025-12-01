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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

import { Profile } from "./profile";
import { useUser } from "@/context/userContext";
import { CalendarIcon } from "../_icons/calendarIcon";

export const CardHeader = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [profile, setProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);
  const { user, logout } = useUser();

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const getData = async () => {
    const data = await fetch(`${backend_url}/foodOrder`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const jsonData = await data.json();
    setFoodOrders(jsonData);
    setFilteredOrders(jsonData);
    console.log(filteredOrders, "gg");
    console.log(jsonData, "ll");
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
      await fetch(`${backend_url}/foodOrder/${orderId}`, {
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
  const formatDate = (d) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / orderPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="w-full max-sm:w-full  p-5  gap-5 flex flex-col rounded-md">
      <div className="w-full max-sm:w-full flex   flex-col gap-2 ">
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
      <div className="rounded-md bg-white w-full max-sm:w-full">
        <div className=" flex justify-between shadow-sm p-5   ">
          <div className=" flex flex-col items-center">
            <p className="font-bold text-xl">Orders</p>
            <p>{filteredOrders.length} items</p>
          </div>
          <div className="flex pr-4 items-center gap-3">
            <div className="w-[250px] relative ">
              <div className="flex items-center gap-15 border rounded-full p-2  bg-white shadow-sm">
                <CalendarIcon />
                <input
                  type="date"
                  value={formatDate(date)}
                  onClick={() => setDateOpen(!dateOpen)}
                  readOnly
                  className=" flex-1 cursor-pointer  bg-transparent outline-none "
                  placeholder="Select date"
                />
              </div>

              {dateOpen && (
                <div className="absolute z-50 top-10">
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
                        {selectedOrder.length > 0 && `${selectedOrder.length}`}
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
          {currentOrders.map((order, index) => (
            <FoodCards
              key={order._id}
              foods={order.foodOrderItems}
              index={indexOfFirstOrder + index + 1}
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
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                isActive={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
            }
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
};
