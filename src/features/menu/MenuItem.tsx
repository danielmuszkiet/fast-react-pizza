import type { Pizza, TCartItem } from "../../types";

import { useAppDispatch } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";

import Button from "../../ui/Button";

function MenuItem({ pizza }: { pizza: Pizza }) {
  const dispatch = useAppDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handelAddItem() {
    const item: TCartItem = {
      pizzaId: id,
      name,
      unitPrice: unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    dispatch(addItem(item));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {!soldOut && (
            <Button type="small" onClick={handelAddItem}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
