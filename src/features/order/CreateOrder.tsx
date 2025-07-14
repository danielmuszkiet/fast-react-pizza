import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCart, selectCart, selectTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

const PRIORITY_PRICE_PERCENTAGE = 0.2;

function CreateOrder() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.userName);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const cart = useAppSelector(selectCart);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const actionData = useActionData<{ errorMsg: ""; newOrderId: "" }>();

  const [withPriority, setWithPriority] = useState(false);

  const priorityPrice = withPriority
    ? PRIORITY_PRICE_PERCENTAGE * totalCartPrice
    : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.newOrderId) {
      dispatch(clearCart());
      navigate(`/order/${actionData.newOrderId}`);
    }
  }, [dispatch, actionData?.newOrderId, navigate]);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-1/5">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input flex-1"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-1/5">Phone number</label>
          <div className="relative grow">
            <input type="tel" name="phone" required className="input w-full" />
            {actionData?.errorMsg && (
              <p className="absolute w-full rounded-md p-1 text-center text-xs text-red-400 sm:top-0">
                {actionData.errorMsg}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-1/5">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />

          <Button disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order ..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
