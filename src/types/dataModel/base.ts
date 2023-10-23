import { ObjectId } from 'bson';
import { z } from 'zod';

export const zObjectId = z.string().refine((val) => ObjectId.isValid(val));

const zBase = z.object({
  _id: zObjectId,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface Base extends z.infer<typeof zBase> {}

export default zBase;
