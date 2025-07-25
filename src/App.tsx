import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import { menuLoader, orderLoader } from "./loaders/loader";
import { NotFound } from "./ui/Error";
import { createOrderAction, updateOrderAction } from "./actions/action";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      {
        path: "menu",
        Component: Menu,
        loader: menuLoader,
        errorElement: <NotFound />,
      },
      { path: "cart", Component: Cart },
      { path: "order/new", Component: CreateOrder, action: createOrderAction },
      {
        path: "order/:orderId",
        Component: Order,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
