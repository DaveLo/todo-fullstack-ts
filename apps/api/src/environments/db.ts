import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import env from "./environment";

export const dbClient = new DynamoDBClient({ region: env.region });
