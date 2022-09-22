import {
  Task,
  TaskFilters,
  TaskInput,
  TaskInputType,
  type TaskType,
} from "@todos/schemas/todos";
import { mutateCreate, queryByStatus } from "@todos/utils/data";

import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Create a new todo
 * @param db document client instance
 * @param tableName table to query
 * @param task new task to be created
 * @param userId unique user id
 * @returns new todo
 */
export function todosFeatureCreate(
  db: DynamoDBDocumentClient,
  tableName: string,
  task: unknown,
  userId = "TEST_USER",
): Promise<TaskType> {
  const newTask = TaskInput.parse(task);
  return mutateCreate(db, tableName, userId, newTask);
}
