import { Link } from "react-router";

function Button({
  onClick,
  type = "primary",
  to,
  disabled,
  children,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "small" | "primary" | "secondary";
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "text-sm inline-block cursor-pointer rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed" +
    " ";

  const styles = {
    primary: base + "px-4 py-2 md:px-6 md:py-3 sm:text-base",
    secondary:
      "text-sm inline-block cursor-pointer rounded-full font-semibold border-2 border-stone-300 tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed px-4 py-1.5 md:px-6 md:py-2.5 sm:text-base",
    small: base + "px-4 py-2 md:px-5 md:py-2 text-xs",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
