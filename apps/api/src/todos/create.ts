import "source-map-support/register";

import { todosFeatureCreate } from "@todos/todos/feature/create";
import { errorApiHelper } from "@todos/utils/errors";

import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { dbClient } from "../environments/db";

const { TABLE_NAME } = process.env;

const db = DynamoDBDocumentClient.from(dbClient);

/** Parses request/response data for API GW */
export async function httpCreateRequest(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    if (TABLE_NAME === undefined) {
      throw new Error("Missing table name config");
    }

    if (!event.body || event.body === null) {
      throw new Error("Missing request body");
    }

    const request = JSON.parse(event.body);
    const response = await todosFeatureCreate(db, TABLE_NAME, request);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
    return errorApiHelper(error);
  }
}

export const handler = httpCreateRequest;
