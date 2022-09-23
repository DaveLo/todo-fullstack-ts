import "source-map-support/register";

import { todosFeatureList } from "@todos/todos-feature-read";
import { errorApiHelper } from "@todos/utils/errors";

import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { dbClient } from "../environments/db.local";

const { TABLE_NAME } = process.env;

const db = DynamoDBDocumentClient.from(dbClient);

/** Parses request/response data for API GW */
export async function httpListRequest(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    if (TABLE_NAME === undefined) {
      throw new Error("Missing table name config");
    }
    const x = await db.send(new ListTablesCommand({}));
    console.log(x);
    const { queryStringParameters } = event;
    const filter = queryStringParameters?.["filter"] ?? "ALL";

    const result = await todosFeatureList(filter, db, TABLE_NAME);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return errorApiHelper(error);
  }
}

export const handler = httpListRequest;
