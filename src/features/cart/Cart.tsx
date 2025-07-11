import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { selectCart } from "./cartSlice";
import { clearCart } from "./cartSlice";

import { selectUsername } from "../user/userSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);
  const username = useAppSelector(selectUsername);

  function handelClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y-2 divide-stone-200 border-b-2 border-stone-200">
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaId} />;
        })}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button onClick={handelClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
