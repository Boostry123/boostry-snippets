/**
 * The returned function will only call `fn` once
 * @param fn a generic function that can take in any arguments and return any type
 * @returns A function that will call `fn` only once and return the result of the first call.
 *
 */
export default function once<Args extends unknown[], T>(
  fn: (...args: Args) => T,
) {
  let called = false;
  let result: T;
  return (...args: Args) => {
    if (called) {
      return result;
    }
    result = fn(...args);
    called = true;
    return result;
  };
}
