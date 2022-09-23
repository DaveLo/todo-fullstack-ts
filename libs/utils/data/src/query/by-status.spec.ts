import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";

import { queryByStatus } from "./by-status";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ddbMock = mockClient(ddb);

/**
 * Reset mock behavior between test runs
 */
beforeEach(() => {
  ddbMock.reset();
});

test("it should query with no filter if none provided", async () => {
  ddbMock.on(QueryCommand).resolves({
    Items: [{ key: "a very real response" }],
  });

  await queryByStatus(ddb, "table", "testuser");

  expect(ddbMock).toHaveReceivedCommand(QueryCommand);
  expect(ddbMock).toHaveReceivedCommandWith(QueryCommand, {
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "testuser",
    },
  });
});

test("it should query with filter if provided", async () => {
  ddbMock.on(QueryCommand).resolves({
    Items: [{ key: "a very real response" }],
  });

  await queryByStatus(ddb, "table", "testuser", "TASK_PINNED");

  expect(ddbMock).toHaveReceivedCommand(QueryCommand);
  expect(ddbMock).toHaveReceivedCommandWith(QueryCommand, {
    KeyConditionExpression:
      "userId = :userId and begins_with(status_taskId, :statusFilter)",
    ExpressionAttributeValues: {
      ":userId": "testuser",
      ":statusFilter": "TASK_PINNED",
    },
  });
});
