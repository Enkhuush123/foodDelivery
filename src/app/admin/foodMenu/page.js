import { Category } from "@/app/_feature/category";
import { Navigation02 } from "@/app/_feature/navigation02";
import { Product } from "@/app/_feature/product";

export default function foodMenu() {
  return (
    <div className="flex flex-row shadow-sm ">
      <Navigation02 />
      <div className="flex flex-col gap-10">
        <Category />
        <Product />
      </div>
    </div>
  );
}
