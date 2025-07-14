import { type ActionFunctionArgs } from "react-router";
import { createOrder } from "../services/apiRestaurant";
import type { NewOrder } from "../types";

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function createOrderAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const { address, phone, customer } = data;
  const cartData = JSON.parse(data.cart as string);

  const order: NewOrder = {
    customer: customer as string,
    address: address as string,
    phone: phone as string,
    cart: cartData,
    priority: data.priority === "on",
  };

  const actionData = { errorMsg: "", newOrderId: "" };

  if (!isValidPhone(order.phone))
    actionData.errorMsg = "Please give us a valid phone number.";
  if (Object.keys(actionData.errorMsg).length > 0) return actionData;

  const newOrder = await createOrder(order);
  actionData.newOrderId = newOrder.id;

  return actionData;
}
