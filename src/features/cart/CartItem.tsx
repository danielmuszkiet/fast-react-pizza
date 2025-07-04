import { formatCurrency } from "../../utils/helpers";
import type { TItem } from "../../types";

function CartItem(item: TItem) {
  //pizzaId

  const { name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
