import { isRouteErrorResponse, useRouteError } from "react-router";
import LinkButton from "./LinkButton";

export function NotFound() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong 😢</h1>
        <h2>
          {error.status} {error.statusText}
        </h2>
        <p>{error.data}</p>
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.message}</p>

        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
