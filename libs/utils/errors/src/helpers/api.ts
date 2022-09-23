import { ApiError } from "@todos/schemas/api";

import type { APIGatewayProxyResult } from "aws-lambda";
import { ZodError } from "zod";

export function errorApiHelper(error: unknown): APIGatewayProxyResult {
  const response = ApiError.parse({
    statusCode: 500,
    errorType: "ServerError",
  });

  if (error instanceof ZodError) {
    response.errorType = "InputValidation";
    response.statusCode = 400;
    response.issues = error.issues.map((issue) => issue.message);
  }

  return { statusCode: response.statusCode, body: JSON.stringify(response) };
}
