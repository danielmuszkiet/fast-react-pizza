import { useAppDispatch } from "../../hooks";

import { deleteItem } from "./cartSlice";

import Button from "../../ui/Button";

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button type="small" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteItem;
