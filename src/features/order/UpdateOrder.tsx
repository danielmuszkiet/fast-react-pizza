import { useFetcher } from "react-router";

import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
