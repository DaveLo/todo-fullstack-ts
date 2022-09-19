import type { TaskType } from "@todos/schemas/todos";

export async function updateArchiveTask(task: TaskType): Promise<TaskType> {
  return { ...task, state: "TASK_ARCHIVED" };
}
