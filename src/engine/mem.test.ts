import { zero } from "@/engine/mem.js";
import { expect, test } from "vitest";

test("zeroes an object recursively", () => {
  const input = {
    a: 123,
    b: "test",
    c: true,
    d: {
      e: 456,
      f: "testtest",
      g: false,
    },
  };

  const expected = {
    a: 0,
    b: "",
    c: false,
    d: {
      e: 0,
      f: "",
      g: false,
    },
  };

  zero(input);

  expect(input).toEqual(expected);
});
