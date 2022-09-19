import type { TaskType } from "@todos/schemas/todos";

const defaultTasks: TaskType[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export async function getTasks(): Promise<TaskType[]> {
  return Promise.resolve(defaultTasks);
}
