import { z } from "zod";

export const ApiError = z.object({
  errorType: z.string(),
  statusCode: z.number(),
  issues: z.string().array().optional(),
});

export type ApiErrorType = z.infer<typeof ApiError>;
