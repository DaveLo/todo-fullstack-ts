import { z } from "zod";

export const TaskStates = [
  "TASK_INBOX",
  "TASK_PINNED",
  "TASK_ARCHIVED",
] as const;

export const TaskFilters = z.enum([...TaskStates, "ALL"]);

export const Task = z.object({
  taskId: z.string().uuid(),
  title: z.string(),
  status: z.enum(TaskStates),
});

export const TaskEntity = Task.extend({
  userId: z.string(),
  status_taskId: z.string(), // not sure how to say this is a combination field
});

export const TaskInput = Task.omit({ taskId: true });

export type TaskType = z.infer<typeof Task>;
export type TaskInputType = z.input<typeof TaskInput>;
export type TaskEntityType = z.infer<typeof TaskEntity>;
export type TaskFiltersType = z.infer<typeof TaskFilters>;
