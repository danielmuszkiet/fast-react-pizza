import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useAppSelector } from "../../hooks";

function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const username = useAppSelector((state) => state.user.userName);

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
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
