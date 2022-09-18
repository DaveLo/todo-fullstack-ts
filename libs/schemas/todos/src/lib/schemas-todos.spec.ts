import { schemasTodos } from "./schemas-todos";

describe("schemasTodos", () => {
  it("should work", () => {
    expect(schemasTodos()).toEqual("schemas-todos");
  });
});
