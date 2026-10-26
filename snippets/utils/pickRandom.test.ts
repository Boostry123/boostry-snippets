import { vi, it, expect, describe } from "vitest";
import pickRandom from "./pickRandom";

describe("pickRandom", () => {
  it.each([
    { rndValue: 0, expected: 1 },
    { rndValue: 0.5, expected: 3 },
    { rndValue: 0.99, expected: 5 },
  ])(
    "should return item from random number: $rndValue and expected to be: $expected",

    ({ rndValue, expected }) => {
      vi.spyOn(Math, "random").mockReturnValue(rndValue);
      const testArray = [1, 2, 3, 4, 5];

      expect(pickRandom(testArray)).toBe(expected);
    },
  );
  it("should throw error if array is empty", () => {
    const mockMathRnd = vi.spyOn(Math, "random");
    const emptyArray: string[] = [];
    expect(() => {
      pickRandom(emptyArray);
    }).toThrow(RangeError);
    expect(mockMathRnd).toHaveBeenCalledTimes(0);
  });
});
