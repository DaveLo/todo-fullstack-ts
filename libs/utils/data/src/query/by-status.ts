import type { TaskFiltersType } from "@todos/schemas/todos";

import { QueryCommand, type QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export function queryByStatus(
  db: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
  filter?: Omit<TaskFiltersType, "ALL">,
): Promise<QueryCommandOutput> {
  let query = "userId = :userId";

  if (filter) {
    query += " begins_with(status_taskId, :statusFilter)";
  }

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
}
