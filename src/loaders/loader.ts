import { getMenu, getOrder } from "../services/apiRestaurant";
import type { LoaderFunctionArgs } from "react-router";

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function orderLoader({ params }: LoaderFunctionArgs) {
  const { orderId } = params;

  if (!orderId) {
    throw new Error("Order ID is missing");
  }
  const order = await getOrder(orderId);

  return order;
}
