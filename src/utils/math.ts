import CMError, { CMErrorType } from './cmerror';

export function getRangesOverlap(ranges: [number, number][]): [number, number] {
  if (ranges.length == 0) {
    throw new CMError(CMErrorType.BadValue, 'range');
  }
  let min: number = ranges[0][0];
  let max: number = ranges[0][1];
  for (let i = 0; i < ranges.length; i++) {
    min = Math.min(min, ranges[i][0]);
    max = Math.max(max, ranges[i][1]);
  }
  return [min, max];
}
