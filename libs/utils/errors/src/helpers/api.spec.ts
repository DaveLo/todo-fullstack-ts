import { ZodError } from "zod";

import { errorApiHelper } from "./api";

test("it should handle unspecified runtime errors", () => {
  const expected = {
    statusCode: 500,
    body: JSON.stringify({ errorType: "ServerError", statusCode: 500 }),
  };
  const actual = errorApiHelper(new Error("Something went wrong"));

  expect(actual).toEqual(expected);
});

test("it should handle thrown non-errors", () => {
  const expected = {
    statusCode: 500,
    body: JSON.stringify({ errorType: "ServerError", statusCode: 500 }),
  };
  const actual = errorApiHelper("Something went wrong");

  expect(actual).toEqual(expected);
});

test("it should handle validation errors", () => {
  const expected = {
    statusCode: 400,
    body: JSON.stringify({
      errorType: "InputValidation",
      statusCode: 400,
      issues: [],
    }),
  };
  const actual = errorApiHelper(new ZodError([]));

  expect(actual).toEqual(expected);
});
