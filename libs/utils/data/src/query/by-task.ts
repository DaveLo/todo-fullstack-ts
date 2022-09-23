import { QueryCommand, type QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Finds a task by it's unique ID.
 * @param db document client instance
 * @param tableName table key
 * @param userId unique user ID
 * @param taskId unique task ID
 * @returns task object
 */
export function queryByTask(
  db: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
  taskId: string,
): Promise<QueryCommandOutput> {
  try {
    const request = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "userId = :userId and taskId = :taskId",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":taskId": taskId,
      },
    });

    return db.send(request);
  } catch (error) {
    // need to manage errors here, some should bubble
    // others should return an empty set.
    throw error;
  }
}
