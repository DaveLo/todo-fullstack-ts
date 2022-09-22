import "source-map-support/register";

import { todosFeatureList } from "@todos/todos-feature-read";

import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { dbClient } from "../environments/db.local";

const { TABLE_NAME } = process.env;

const db = DynamoDBDocumentClient.from(dbClient);
export async function httpListRequest(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    if (TABLE_NAME === undefined) {
      throw new Error("Missing table name config");
    }

    const { queryStringParameters } = event;
    const filter = queryStringParameters?.["filter"] ?? "ALL";

    const result = await todosFeatureList(filter, db, TABLE_NAME);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export const handler = httpListRequest;
