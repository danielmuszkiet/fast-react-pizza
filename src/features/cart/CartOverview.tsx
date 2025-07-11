import { Link } from "react-router";
import { useAppSelector } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import { selectCartQuantity, selectTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useAppSelector(selectCartQuantity);
  const totalCartPrize = useAppSelector(selectTotalCartPrice);

  if (totalCartQuantity <= 0) return null;

  return (
    <div className="flex flex-row items-center justify-between bg-stone-800 px-4 py-4 text-stone-200 uppercase sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrize)}</span>
      </p>
      <Link
        to="/cart"
        className="text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
