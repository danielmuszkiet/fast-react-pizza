import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCart, selectCart, selectTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import { MapPinHouse } from "lucide-react";

const PRIORITY_PRICE_PERCENTAGE = 0.2;

function CreateOrder() {
  const dispatch = useAppDispatch();
  const {
    userName,
    address,
    position,
    status: addressStatus,
    error: errorAdress,
  } = useAppSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

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
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-1/5">Phone number</label>
          <div className="relative grow">
            <input type="tel" name="phone" required className="input w-full" />
            {actionData?.errorMsg && (
              <p className="absolute w-full p-1 text-center text-xs text-red-400 sm:top-0">
                {actionData.errorMsg}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-1/5">Address</label>
          <div className="flex grow gap-2">
            <div className="relative grow">
              <input
                disabled={isLoadingAddress}
                type="text"
                name="address"
                defaultValue={address}
                required
                className="input w-full"
              />
              {addressStatus == "error" && (
                <p className="z- absolute right-0 w-full p-1 text-center text-xs text-red-400 sm:top-0">
                  {errorAdress}
                </p>
              )}
            </div>
            {!address && (
              <Button
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                <MapPinHouse />
              </Button>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5 pt-2 sm:pt-0">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            className="text-s text-sm font-medium sm:text-base"
            htmlFor="priority"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={JSON.stringify(
              position?.latitude && position.latitude
                ? `${position?.latitude},${position?.longitude}`
                : "",
            )}
            name="position"
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
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
