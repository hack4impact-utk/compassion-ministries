import { z } from 'zod';

// TODO: implement our own validation for this :(
export const zObjectId = z.string();

const zBase = z.object({
  _id: zObjectId,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export interface Base extends z.infer<typeof zBase> {}

export default zBase;
