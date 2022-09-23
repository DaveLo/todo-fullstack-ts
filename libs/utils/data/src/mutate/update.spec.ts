import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { v4 as uuid } from "uuid";

import { mutateUpdate } from "./update";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ddbMock = mockClient(ddb);

/**
 * Reset mock behavior between test runs
 */
beforeEach(() => {
  ddbMock.reset();
});

test("it should call both query and put", async () => {
  const id = uuid();
  ddbMock.on(GetCommand).resolves({
    Item: {
      taskId: id,
      title: "some task",
      status: "TASK_INBOX",
      userId: "testuser",
      status_taskId: `TASK_INBOX#${id}`,
    },
  });

  await mutateUpdate(ddb, "table", "testuser", {
    taskId: id,
    status: "TASK_INBOX",
    title: "new todo",
  });

  expect(ddbMock).toHaveReceivedCommandTimes(GetCommand, 1);
  expect(ddbMock).toHaveReceivedCommandTimes(PutCommand, 1);
});

test("it should update task title", async () => {
  const id = uuid();
  ddbMock.on(GetCommand).resolves({
    Item: {
      taskId: id,
      title: "some task",
      status: "TASK_INBOX",
      userId: "testuser",
      status_taskId: `TASK_INBOX#${id}`,
    },
  });

  await mutateUpdate(ddb, "table", "testuser", {
    taskId: id,
    status: "TASK_INBOX",
    title: "testing todo update",
  });

  expect(ddbMock).toHaveReceivedCommandWith(PutCommand, {
    Item: {
      taskId: id,
      title: "testing todo update",
      status: "TASK_INBOX",
      userId: "testuser",
      status_taskId: `TASK_INBOX#${id}`,
    },
  });
});

test("it should update both status and composite key for status update", async () => {
  const id = uuid();
  ddbMock.on(GetCommand).resolves({
    Item: {
      taskId: id,
      title: "some task",
      status: "TASK_INBOX",
      userId: "testuser",
      status_taskId: `TASK_INBOX#${id}`,
    },
  });

  await mutateUpdate(ddb, "table", "testuser", {
    taskId: id,
    status: "TASK_PINNED",
    title: "some task",
  });

  expect(ddbMock).toHaveReceivedCommandWith(PutCommand, {
    Item: {
      taskId: id,
      title: "some task",
      status: "TASK_PINNED",
      userId: "testuser",
      status_taskId: `TASK_PINNED#${id}`,
    },
  });
});

test("it should throw on task not found", () => {
  expect.assertions(1);

  return expect(
    mutateUpdate(ddb, "table", "testuser", {
      taskId: "test",
      status: "TASK_INBOX",
      title: "new todo",
    }),
  ).rejects.toEqual(new Error("Task not found"));
});
