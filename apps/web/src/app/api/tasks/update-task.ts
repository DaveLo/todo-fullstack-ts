import type { TaskType } from "@todos/schemas/todos";

export async function updateArchiveTask(task: TaskType): Promise<TaskType> {
  return { ...task, status: "TASK_ARCHIVED" };
}

export async function updateTogglePin(id: TaskType["taskId"]) {
  return "";
}
