import "source-map-support/register";

import type { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => ({
  statusCode: 200,
  body: JSON.stringify(event, null, 2),
});
