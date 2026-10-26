/**
 *
 * @param text 
 * @param maxLength The maximum length text should be truncated to.

 * @param suffix The suffix to add at the end of truncated text
 *
 * @return truncated `text` as string  to the desired  `maxLength` with `suffix` at the end ( Note  the suffix is additional chars to the maxLength).
 */
export default function truncate(
  text: string,
  maxLength: number,
  suffix = "...",
) {
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError("maxLength must be a non-negative integer");
  }
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + suffix;
  }

  return text.slice(0, maxLength);
}
