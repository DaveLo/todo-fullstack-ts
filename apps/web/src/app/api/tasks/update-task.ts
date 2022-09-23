import type { TaskType } from "@todos/schemas/todos";

// mock impl
export async function updateArchiveTask(task: TaskType): Promise<TaskType> {
  return { ...task, status: "TASK_ARCHIVED" };
}

// mock impl
export async function updateTogglePin(task: TaskType): Promise<TaskType> {
  return { ...task, status: "TASK_PINNED" };
}
