// Test ID: IIDSAT or CQE92U

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import type { Pizza, Order as TOrder } from "../../types";
import { useFetcher, useLoaderData } from "react-router";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData<TOrder>();

  const fetcher = useFetcher<Pizza[]>();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    cart,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-400 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-400 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-300">
        {cart.map((item) => {
          return (
            <OrderItem
              ingredients={
                fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients
              }
              isLoadingIngredients={fetcher.state === "loading"}
              item={item}
              key={item.pizzaId}
            />
          );
        })}
      </ul>

      <div className="space-y-2 rounded-sm bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;
