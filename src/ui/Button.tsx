import { Link } from "react-router";

function Button({
  type = "primary",
  to,
  disabled,
  children,
}: {
  type?: "small" | "primary";
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-block cursor-pointer rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed" +
    " ";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "px-4 py-2 md:px-5 md:py-2 text-xs",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
