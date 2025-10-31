import { EditIcon } from "../_icons/edit";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FoodContain = () => {
  return (
    <div className="p-5">
      <div className="w-[270.75px] h-[241px] rounded-lg shadow-sm  flex flex-col justify-center  gap-2 p-5">
        <div className="w-[238.75px] h-[129px] flex justify-center relative ">
          <img
            className="w-[238.75px] h-[129px] rounded-lg absolute -z-10"
            src="/food.png"
          ></img>
          <div className="w-full h-full flex justify-end items-end p-2">
            {/* <button className="h-11 w-11 bg-white rounded-full flex items-center justify-center">
              <EditIcon />
            </button> */}
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 w-11 bg-white rounded-full flex items-center justify-center"
                  >
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[472px]">
                  <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                      <p>Dish name</p>
                      <input className="w-[288px] h-9 shadow-sm rounded-lg pl-5"></input>
                    </div>{" "}
                    <div className="flex justify-between">
                      <p>Dish category</p>
                      <input className="w-[288px] h-9 shadow-sm rounded-lg pl-5"></input>
                    </div>
                    <div className="flex justify-between">
                      <p>Ingredients</p>
                      <input className="w-[288px] h-20 shadow-sm rounded-lg pl-5"></input>
                    </div>
                    <div className="flex justify-between">
                      <p>Price</p>
                      <input className="w-[288px] h-9 shadow-sm rounded-lg pl-5"></input>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-red-600  ">
            Brie Crostini Appetizer{" "}
          </p>
          <p>$12.99</p>
        </div>
        <div>
          <p className="font-normal text-xs">
            Fluffy pancakes stacked with fruits, cream, syrup, and powdered
            sugar.
          </p>
        </div>
      </div>
    </div>
  );
};
