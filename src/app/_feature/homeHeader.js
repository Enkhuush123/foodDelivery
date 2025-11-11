import { UserIcon } from "lucide-react";
import { WebLogo } from "../_icons/logo";
import { Navigation } from "../_icons/navigationIcon";
import { RightIcon } from "../_icons/rightIcon";
import { ShopIcon } from "../_icons/shopIcon";

export const HomeHeader = () => {
  return (
    <div className="w-[full] bg-black h-[172px] flex items-center justify-between p-5 ">
      <div className="flex flex-row items-center  ">
        <WebLogo />
        <div className="flex flex-col ">
          <p className="text-white flex">
            Nom<span className="text-red-500">Nom</span>
          </p>
          <p className="text-white">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-2 cursor-pointer ">
        <div className="w-[251px] h-9 bg-white flex items-center rounded-full justify-center gap-2  ">
          <Navigation />

          <span className="text-red-500 font-normal text-xs">
            Delivery address:
          </span>

          <span className="font-normal text-neutral-400 text-xs">
            Add Location
          </span>
          <RightIcon />
        </div>

        <div>
          <button className="bg-white flex items-center w-9 h-9 justify-center rounded-full">
            <ShopIcon />
          </button>
        </div>
        <div>
          <button className="w-9 h-9 bg-white flex items-center justify-center rounded-full">
            <UserIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
