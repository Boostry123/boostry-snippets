import { describe, vi, it, expect } from "vitest";
import once from "./once";

describe("once", () => {
  it("does not call the fn until the wrapped function is called", () => {
    const mockFn = vi.fn((str: string) => {
      return str;
    });
    const wrapped = once(mockFn);
    expect(mockFn).toHaveBeenCalledTimes(0);
    wrapped("test");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it("returns the same value from the first run", () => {
    const mockFn = vi.fn(() => new Object());
    const wrapped = once(mockFn);
    const firstRun = wrapped();
    wrapped();
    const thirdRun = wrapped();

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(firstRun).toBe(thirdRun);
  });
  it("Only first call arguments are used", () => {
    const mockFn = vi.fn((str1?: string, str2?: string) => {
      return `${str1} | ${str2}`;
    });
    const wrapped = once(mockFn);
    wrapped("world", "hello");
    wrapped();
    expect(mockFn).toHaveBeenCalledWith("world", "hello");
    expect(mockFn).not.toHaveBeenCalledWith();
  });

  it("retry after a throw", () => {
    const mockFn = vi.fn(() => "ok");
    const wrapped = once(mockFn);
    mockFn.mockImplementationOnce(() => {
      throw new Error("boom");
    });
    expect(() => wrapped()).toThrow("boom");
    expect(wrapped()).toBe("ok");
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
