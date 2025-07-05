import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import { menuLoader } from "./features/loaders/loader";
import { NotFound } from "./ui/Error";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu, loader: menuLoader, errorElement: <NotFound /> },
      { path: "cart", Component: Cart },
      { path: "order/new", Component: CreateOrder },
      { path: "order/:orderId", Component: Order },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
