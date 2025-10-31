import { FoodCards } from "../_components/foodCard";
import { Arrow } from "../_icons/arrows";

export const CardHeader = () => {
  return (
    <div className="pt-[84px] pl-5">
      <div className="w-[1950px] shadow-sm flex flex-col  ">
        <div className="h-[71px] flex justify-between shadow-sm  ">
          <div className="pl-4 flex flex-col items-center">
            <p className="font-bold text-xl">Orders</p>
            <p>32 items</p>
          </div>
          <div className="flex pr-4 items-center gap-3">
            <div className="w-[300px] h-9 rounded-full shadow-sm">
              <input type="date"></input>
            </div>
            <div className="w-[179px] h-9 rounded-full shadow-sm flex items-center justify-center">
              <button>
                <p>Change delivery state</p>
              </button>
            </div>
          </div>
        </div>
        <div className="h-14 flex justify-between shadow-sm items-center p-5">
          <div>
            <input type="checkbox"></input>
          </div>
          <div className="w-14 h-[52px] flex items-center">
            <p>№</p>
          </div>
          <div className="w-[213px] h-[52px] flex items-center">
            <p>Customer</p>
          </div>
          <div className="w-40 h-[52px] flex items-center ">
            <p>Food</p>
          </div>
          <div className="flex items-center gap-5 w-40 h-[52px]">
            <p>Date</p> <Arrow />
          </div>
          <div className="w-40 h-[52px] flex items-center">
            <p>Total</p>
          </div>
          <div className="w-[213px] h-[52px] flex items-center">
            <p>Delivery Address</p>
          </div>
          <div className="flex items-center gap-5 w-40 h-[52px] ">
            <p>Delivery state</p> <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
};
