import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";

import { mutateCreate } from "./create";

jest.mock("uuid", () => ({ v4: () => "testid" }));

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ddbMock = mockClient(ddb);

/**
 * Reset mock behavior between test runs
 */
beforeEach(() => {
  ddbMock.reset();
});

test("it should correctly format the new task", async () => {
  ddbMock.on(PutCommand).resolves({});

  const expected = {
    taskId: "testid",
    status: "TASK_INBOX",
    title: "new todo",
  };
  const actual = await mutateCreate(ddb, "table", "testuser", {
    status: "TASK_INBOX",
    title: "new todo",
  });

  expect(ddbMock).toHaveReceivedCommandWith(PutCommand, {
    Item: {
      status: "TASK_INBOX",
      status_taskId: "TASK_INBOX#testid",
      taskId: "testid",
      title: "new todo",
      userId: "testuser",
    },
    TableName: "table",
  });

  expect(expected).toStrictEqual(actual);
});
