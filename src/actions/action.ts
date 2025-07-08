import { redirect, type ActionFunctionArgs } from "react-router";
import { createOrder } from "../services/apiRestaurant";
import type { ErrorTypes, NewOrder } from "../types";

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

  const errors: ErrorTypes = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us a valid phone number.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
