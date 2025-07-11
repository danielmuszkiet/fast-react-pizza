import CreateUser from "../features/user/CreateUser";
import { useAppSelector } from "../hooks";
import Button from "./Button";

function Home() {
  const username = useAppSelector((state) => state.user.userName);

  return (
    <div className="my-10 px-16 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to="/menu">Continue ordering, {username}</Button>
      )}
    </div>
  );
}

export default Home;
