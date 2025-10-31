import { Arrow } from "../_icons/arrows";
import { DownArrow } from "../_icons/downArrow";

export const FoodCards = () => {
  return (
    <div className="pl-5">
      <div className="w-[1950px] h-14 flex justify-between p-5 shadow-sm items-center  ">
        <div>
          <input type="checkbox"></input>
        </div>
        <div className="w-14 h-[52px] flex items-center">
          <p>1</p>
        </div>
        <div className="w-[213px] h-[52px] flex items-center">
          <p>test@gmail.com</p>
        </div>
        <div>
          <button className="flex items-center gap-5 w-40 h-[52px] ">
            <p>2 foods</p> <DownArrow />
          </button>
        </div>
        <div className="flex items-center w-40 h-[52px]">
          <p>2025/11/29</p>
        </div>
        <div className="w-40 h-[52px] flex items-center">
          <p>$26.96</p>
        </div>
        <div className="w-[213px] h-[52px] flex items-center">
          <p>Address</p>
        </div>
        <div className="flex items-center  gap-5 w-40 h-[52px] ">
          <button className="flex items-center  gap-5">
            <p>Pending</p> <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
};
