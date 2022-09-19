const IS_PRODUCTION = process.env["IS_PRODUCTION"] === "true";
const IS_OFFLINE = process.env["IS_OFFLINE"] === "true";
const APP_ENV = process.env["APP_ENV"] ?? "dev";
const AWS_REGION = process.env["AWS_REGION"] ?? "us-east-1";

export const environment = {
  stage: APP_ENV,
  region: AWS_REGION,
  production: IS_PRODUCTION,
  offline: IS_OFFLINE,
} as const;
