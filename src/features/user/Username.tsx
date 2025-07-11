import { useAppSelector } from "../../hooks";

function Username() {
  const username = useAppSelector((state) => state.user.userName);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold sm:block">{username}</div>
  );
}

export default Username;
