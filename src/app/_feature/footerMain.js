import { useState, useEffect } from "react";
import { WebLogo } from "../_icons/logo";

const option = {
  method: 
    "GET",
  headers: {
    accept: "application/json"
  }
}

export const Footer = () => {

  const [category, setCategory] = useState([])

  const getData = async () => {
    const data = await fetch(`http://localhost:9000/category`, option);
    const jsonData = await data.json();
    setCategory(jsonData);
    console.log(jsonData, "footer category");
  };
  useEffect(() => { getData() }, []);
  return (
    <div className="w-full max-sm:w-full h-[755px] bg-black flex flex-col  items-center gap-50  ">
      <div className="w-full bg-red-500 h-[92px] overflow-x-auto flex items-center mt-10 ">
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
      <div className="flex w-[1264px]  justify-center  gap-50">
        <div className="flex flex-col items-center">
          <div><WebLogo/>
          </div>
       <div> <p className="text-white">Nom<span className="text-red-500">Nom</span>
       </p>
       </div>
       <div> <p className="text-white">Swift delivery</p> 
       </div>
        </div>
        <div className="flex gap-28 w-[788px] h-[228px] justify-evenly">
        <div className="flex flex-col gap-4 "><p className="text-neutral-500">NOMNOM</p>
          <p className="text-white">Home</p>
          <p className="text-white">Contact us</p>
          <p className="text-white">Delivery zone</p>
        </div>
          <div className="flex flex-col gap-5">
            <p className="text-neutral-500">MENU</p>
            {category.map((category) => (
              <p key={category._id} className="text-white">{category.categoryName}</p>
            ))}
            
          </div>
          <div className="flex flex-col gap-5"><p className="text-neutral-500">FOLLOW US</p>
            <div className="flex flex-row gap-5">
            <img className="w-7 h-7" src="/facebook.png" alt="facebook" />
              <img className="w-7 h-7" src="/instagram.png" alt="instagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
