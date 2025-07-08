import { useLoaderData } from "react-router";
import type { Pizza } from "../../types";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData<Pizza[]>();

  return (
    <ul className="divide-y-1 divide-stone-200 px-2">
      {menu.map((pizza) => {
        return <MenuItem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

export default Menu;
