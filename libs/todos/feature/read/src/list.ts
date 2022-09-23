import { Task, TaskFilters, type TaskType } from "@todos/schemas/todos";
import { queryByStatus } from "@todos/utils/data";

import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Sends along list of todos, optionally filtered
 * @param input potential filter case for query
 * @param db document client instance
 * @param tableName table to query
 * @param userId unique user id
 * @returns list of todos
 */
export async function todosFeatureList(
  input: string,
  db: DynamoDBDocumentClient,
  tableName: string,
  userId = "TEST_USER",
): Promise<TaskType[]> {
  /** ensure filters are valid */
  const filter = TaskFilters.parse(input);

  /** screen the all tasks filter, this is the default behavior */
  const f = filter !== "ALL" ? filter : undefined;

  /** make query, return list */
  const list = await queryByStatus(db, tableName, userId, f);

  if (!list?.Items) {
    return [];
  }

  return list.Items.map((item) => {
    const { userId, status_taskId, ...task } = item;
    return Task.parse(task);
  });
}
