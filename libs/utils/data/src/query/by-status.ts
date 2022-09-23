import type { TaskFiltersType } from "@todos/schemas/todos";

import { QueryCommand, type QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Gets list of tasks, optionally filters
 * on task status
 * @param db document client instance
 * @param tableName table key
 * @param userId unique user ID
 * @param filter optional filter condition
 * @returns list of task objects
 */
export function queryByStatus(
  db: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
  filter?: Omit<TaskFiltersType, "ALL">,
): Promise<QueryCommandOutput> {
  let query = "userId = :userId";

  if (filter) {
    query += " and begins_with(status_taskId, :statusFilter)";
  }

  try {
    const request = new QueryCommand({
      TableName: tableName,
      IndexName: "byStatus",
      KeyConditionExpression: query,
      ExpressionAttributeValues: {
        ":userId": userId,
        ...(filter && { ":statusFilter": filter }),
      },
    });

    return db.send(request);
  } catch (error) {
    // need to manage errors here, some should bubble
    // others should return an empty set.
    throw error;
  }
}
