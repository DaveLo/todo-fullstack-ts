import { Task, type TaskType } from "@todos/schemas/todos";

import { z } from "zod";

export const defaultTasks: TaskType[] = [
  { taskId: "1", title: "Something", status: "TASK_INBOX" },
  { taskId: "2", title: "Something more", status: "TASK_INBOX" },
  { taskId: "3", title: "Something else", status: "TASK_INBOX" },
  { taskId: "4", title: "Something again", status: "TASK_INBOX" },
];

export async function getTasks(query: string | null): Promise<TaskType[]> {
  const location = `/api/tasks${query ? `?query=${query}` : ""}`;
  const res = await fetch(location);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return z.array(Task).parse(data);
}
