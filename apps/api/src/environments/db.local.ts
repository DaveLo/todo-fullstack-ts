import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

import env from "./environment";

export const dbClient = new DynamoDBClient({
  region: !env.offline ? env.region : "local",
  endpoint: env.dynamolocal,
  credentials: fromIni({ profile: "local" }),
});
