import { type QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "../components/errors/page";
import { Inbox } from "../components/inbox";
import { action as PinToggleAction } from "../components/inputs/pin-button";
import TaskList, { loader as taskListLoader } from "./task-list";

export function getRouter(queryClient: QueryClient) {
  return createBrowserRouter([
    {
      path: "/",
      element: <Inbox />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TaskList />,
          loader: taskListLoader(queryClient),
        },
        {
          path: "tasks",
          children: [
            {
              path: ":id",
              children: [
                {
                  path: "pin-task",
                  action: PinToggleAction(queryClient),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
