/**
 * Picks a random item from the generic array, will throw an error if array is empty.
 * @param array
 * @throws RangeError if array is empty
 * @returns an item from the provided array
 */

export default function pickRandom<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new RangeError("Array is empty");
  }
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
