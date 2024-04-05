import CMError, { CMErrorType } from './cmerror';

/**
 * Calculate the overlap of a list of interval ranges
 * @param ranges List of pairs where each pair represents a range (e.g. [10,20] represents the range 10 to 20)
 * @returns Pair of numbers containing the
 */
export function getRangesOverlap(
  ranges: [number, number][]
): [number, number] | undefined {
  if (ranges.length == 0) {
    throw new CMError(CMErrorType.BadValue, 'range');
  }
  const min: number = ranges
    .map((range) => {
      return range[0];
    })
    .sort()[0];
  const max: number = ranges
    .map((range) => {
      return range[1];
    })
    .sort()[-1];
  return min > max ? undefined : [min, max];
}
