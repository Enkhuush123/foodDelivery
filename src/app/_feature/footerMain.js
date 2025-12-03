import { useState, useEffect } from "react";
import { WebLogo } from "../_icons/logo";

const option = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const Footer = () => {
  const [category, setCategory] = useState([]);

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getData = async () => {
    const data = await fetch(`${backend_url}/category`, option);
    const jsonData = await data.json();
    setCategory(jsonData);
    console.log(jsonData, "footer category");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full max-sm:w-full  bg-black flex flex-col  items-center gap-50 ">
      <div className="w-full bg-red-500 h-[92px] overflow-x-auto max-sm:w-full flex items-center  ">
        <div className="w-full bg-red-500 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap font-semibold text-xl text-white animate-scroll">
            {Array(25)
              .fill("Fresh that delivered")
              .map((text, i) => (
                <span key={i}>{text}</span>
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-full max-sm:w-full items-center p-5  justify-center  gap-5 max-sm:flex">
        <div className="flex gap-28 w-full  h-[228px] max-sm:w-full max-sm:gap-5 justify-evenly items-center  ">
          <div className="flex flex-col items-center ">
            <div>
              <WebLogo />
            </div>
            <div>
              {" "}
              <p className="text-white">
                Nom<span className="text-red-500">Nom</span>
              </p>
            </div>
            <div>
              {" "}
              <p className="text-white">Swift delivery</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-neutral-500">NOMNOM</p>
            <p className="text-white">Home</p>
            <p className="text-white">Contact us</p>
            <p className="text-white">Delivery zone</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-neutral-500">MENU</p>
            {category.map((category) => (
              <p key={category._id} className="text-white">
                {category.categoryName}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-neutral-500">FOLLOW US</p>
            <div className="flex flex-row gap-5">
              <img className="w-7 h-7" src="/facebook.png" alt="facebook" />
              <img className="w-7 h-7" src="/instagram.png" alt="instagram" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t text-neutral-400 p-5 flex gap-30 items-center">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
