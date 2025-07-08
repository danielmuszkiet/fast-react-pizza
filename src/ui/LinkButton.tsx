import { Link, useNavigate } from "react-router";

function LinkButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const classes =
    "text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer";

  if (to === "-1") {
    return (
      <button className={classes} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export default LinkButton;
