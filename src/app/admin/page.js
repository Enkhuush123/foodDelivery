import { FoodCards } from "../_components/foodCard";
import { CardHeader } from "../_feature/cardHeader";
import { Navigation } from "../_feature/navigation";

export default function adminPage() {
  return (
    <div className="flex flex-row bg-neutral-100 h-full w-full max-sm:w-full max-sm:flex-col   ">
      <Navigation />

      <CardHeader />
    </div>
  );
}
