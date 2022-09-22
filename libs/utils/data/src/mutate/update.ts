import { TaskEntity, type TaskType } from "@todos/schemas/todos";

import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Manages syncing db state from frontend updates
 * @param db document client instance
 * @param tableName table key
 * @param userId unique user ID
 * @param task task to update
 * @returns task object
 */
export async function mutateUpdate(
  db: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
  task: TaskType,
) {
  const getRequest = new GetCommand({
    TableName: tableName,
    Key: {
      userId,
      taskId: task.taskId,
    },
  });
  const data = await db.send(getRequest);

  if (!data?.Item) {
    throw new Error("Task not found");
  }

  const dbTask = TaskEntity.parse(data.Item);

  /** sync any title changes */
  dbTask.title = task.title;

  /** if status update, must update LSI */
  if (dbTask.status !== task.status) {
    dbTask.status = task.status;
    dbTask.status_taskId = `${task.status}#${dbTask.taskId}`;
  }

  const updateRequest = new PutCommand({
    TableName: tableName,
    Item: dbTask,
  });
  const result = await db.send(updateRequest);
  console.log(result);

  return task;
}
