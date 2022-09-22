import { type TaskInputType } from "@todos/schemas/todos";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

/**
 * Creates new task
 * @param db document client instance
 * @param tableName table key
 * @param userId unique user ID
 * @param task task to update
 * @returns new task object
 */
export async function mutateCreate(
  db: DynamoDBDocumentClient,
  tableName: string,
  userId: string,
  task: TaskInputType,
) {
  const newTask = { taskId: uuid(), ...task };
  const request = new PutCommand({
    TableName: tableName,
    Item: {
      ...newTask,
      userId,
      status_taskId: `${newTask.status}#${newTask.taskId}`,
    },
  });

  const data = await db.send(request);
  console.log(data);
  return newTask;
}
