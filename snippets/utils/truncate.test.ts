import { describe, it, expect } from "vitest";
import truncate from "./truncate";

describe("truncate", () => {
  describe("successful cases", () => {
    it("truncate text and add suffix", () => {
      expect(truncate("hello world", 5)).toBe("hello...");
    });
    it("truncate with no suffix", () => {
      expect(truncate("hello world", 11)).toBe("hello world");
    });
  });
  describe("bad input cases", () => {
    it.each([{ input: -1 }, { input: 2.5 }])(
      "$input is a bad input Throw RangeError when maxLength is a negative or non Integer",
      ({ input }) => {
        expect(() => truncate("hello world", input)).toThrow(RangeError);
      },
    );
  });
});
