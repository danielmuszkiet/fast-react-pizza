import { useLoaderData } from "react-router";
import type { Pizza } from "../../types";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData<Pizza[]>();
  console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => {
        return <MenuItem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

export default Menu;
