import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import env from "./environment";

export const dbClient = new DynamoDBClient({
  region: env.region,
  endpoint: env.dynamolocal,
  credentials: {
    accessKeyId: "DEFAULT_ACCESS_KEY",
    secretAccessKey: "DEFAULT_SECRET",
  },
});
