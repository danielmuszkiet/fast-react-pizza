import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../ui/Button";

import {
  increaseItemQuantity,
  decreaseItemQuantity,
  selectCurrentQuantityById,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch();

  const currentQuantity = useAppSelector(selectCurrentQuantityById(pizzaId));

  return (
    <div className="grid grid-cols-3 items-center">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-center text-sm font-medium select-none">
        {currentQuantity}
      </span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
