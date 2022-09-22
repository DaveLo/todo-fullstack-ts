import type { TaskType } from "@todos/schemas/todos";

import type { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs, useFetcher } from "react-router-dom";

import { taskKeys, updateTogglePin } from "../../api/tasks";

export function action(queryClient: QueryClient) {
  return async ({ params }: ActionFunctionArgs) => {
    if (!params["id"]) {
      return;
    }
    await updateTogglePin(params["id"]);
    queryClient.invalidateQueries(taskKeys.detail(params["id"]));
  };
}

export function PinButton({ id }: { id: TaskType["id"] }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="patch" action={`/tasks/${id}/pin-toggle`}>
      <button
        className="pin-button"
        type="submit"
        id={`pinTask-${id}`}
        aria-label={`pinTask-${id}`}
        key={`pinTask-${id}`}
      >
        <span className="icon-star" />
      </button>
    </fetcher.Form>
  );
}
