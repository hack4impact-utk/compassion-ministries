import { z } from 'zod';

const cmErrorTypes = [
  'OK',
  'UnknownError',
  'InternalError',
  'BadValue',
  'NoSuchKey',
  'DuplicateKey',
] as const;
const zCMErrorType = z.enum(cmErrorTypes);

export type CMErrorType = z.infer<typeof zCMErrorType>;
export default zCMErrorType;
