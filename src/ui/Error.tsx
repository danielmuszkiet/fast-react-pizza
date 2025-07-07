import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong 😢</h1>
        <h2>
          {error.status} {error.statusText}
        </h2>
        <p>{error.data}</p>
        <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.message}</p>
        <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
