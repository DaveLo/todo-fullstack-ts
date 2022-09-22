import { TaskType } from "@todos/schemas/todos";

import { useQuery, type QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";

import { getTasks, taskKeys } from "../api/tasks";
import Tasks from "../components/task-list";

const taskListQuery = (q: string | null) => ({
  queryKey: taskKeys.list(q ?? "all"),
  queryFn: () => getTasks(q),
});

export function loader(queryClient: QueryClient) {
  const fetcher = async ({
    request,
  }: LoaderFunctionArgs): Promise<TaskType[]> => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "all";

    if (!queryClient.getQueryData(taskListQuery(query).queryKey)) {
      return await queryClient.fetchQuery(taskListQuery(query));
    }
    return queryClient.getQueryData(taskListQuery(query).queryKey) ?? [];
  };

  return fetcher;
}

export function TaskList() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { query } = useParams();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    ...taskListQuery(query ?? null),
    initialData,
  });

  if (isError) {
    throw new Error("Tasks failed to load");
  }

  const onPin = (id: string) => {
    console.log(id);
  };

  return (
    <Tasks
      loading={isLoading}
      tasks={tasks}
      onArchiveTask={onPin}
      onPinTask={onPin}
    />
  );
}

export default TaskList;
