import { Task, type TaskType } from "@todos/schemas/todos";

import { z } from "zod";

export const defaultTasks: TaskType[] = [
  {
    taskId: "fe5f2943-c17f-4235-9186-e5a1ab53451a",
    title: "Something",
    status: "TASK_INBOX",
  },
  {
    taskId: "a2e892c9-e4b1-4609-b224-a0c8eb3a58f2",
    title: "Something more",
    status: "TASK_INBOX",
  },
  {
    taskId: "07c0a40d-4583-4616-b0c0-861d9ee0ddbc",
    title: "Something else",
    status: "TASK_INBOX",
  },
  {
    taskId: "1716bd3d-5e32-4fb4-9d8f-c66c163bb881",
    title: "Something again",
    status: "TASK_INBOX",
  },
];

export async function getTasks(query?: string): Promise<TaskType[]> {
  const location = `/api/tasks${query ? `?query=${query}` : ""}`;
  const res = await fetch(location);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return z.array(Task).parse(data);
}
