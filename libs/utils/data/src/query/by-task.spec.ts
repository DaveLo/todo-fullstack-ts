/** Mostly boilerplate since this has no code branching yet */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";

import { queryByTask } from "./by-task";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ddbMock = mockClient(ddb);

/**
 * Reset mock behavior between test runs
 */
beforeEach(() => {
  ddbMock.reset();
});

test("it should call the query command", async () => {
  ddbMock.on(QueryCommand).resolves({
    Items: [{ key: "a very real response" }],
  });

  await queryByTask(ddb, "table", "testuser", "testtask");

  expect(ddbMock).toHaveReceivedCommand(QueryCommand);
});
