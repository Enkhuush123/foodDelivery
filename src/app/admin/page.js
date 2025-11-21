import { FoodCards } from "../_components/foodCard";
import { CardHeader } from "../_feature/cardHeader";
import { Navigation } from "../_feature/navigation";

export default function adminPage() {
  return (
    <div className="flex flex-row bg-neutral-100 gap-5  ">
      <Navigation />

      <CardHeader />
    </div>
  );
}
