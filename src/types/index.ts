export type TCartItem = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type Order = {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: TCartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
};

export type NewOrder = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: TCartItem[];
};

export type ErrorTypes = {
  phone?: string;
};
