import { z } from "zod";

export const TaskStates = [
  "TASK_INBOX",
  "TASK_PINNED",
  "TASK_ARCHIVED",
] as const;

export const Task = z.object({
  id: z.string(),
  title: z.string(),
  state: z.enum(TaskStates), // probably an enum here
});

export const TaskInput = Task.omit({ id: true });

export type TaskType = z.infer<typeof Task>;
export type TaskInputType = z.input<typeof TaskInput>;
