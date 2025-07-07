import { Link } from "react-router";

function CartOverview() {
  return (
    <div className="flex flex-row items-center justify-between bg-stone-800 px-4 py-4 text-stone-200 uppercase sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>23 pizzas</span>
        <span>$23.45</span>
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
