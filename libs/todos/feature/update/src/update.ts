import { Task, type TaskType } from "@todos/schemas/todos";
import { mutateUpdate } from "@todos/utils/data";

import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export function todosFeatureUpdate(
  db: DynamoDBDocumentClient,
  tableName: string,
  task: unknown,
  userId = "TEST_USER",
): Promise<TaskType> {
  const updateTask = Task.parse(task);

  return mutateUpdate(db, tableName, userId, updateTask);
}
