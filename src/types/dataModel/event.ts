import { z } from 'zod';
import { zRole } from './roles';
import zBase, { zObjectId } from './base';

const zEvent = z.object({
  name: z.string(),
  description: z.string().optional(),
  eventLocation: z.string().optional(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  date: z.coerce.date().optional(),
  eventRoles: z.array(zRole),
  emailBodies: z.array(z.string()).optional(),
  isRecurring: z.boolean(),
  parentEvent: zObjectId, // we'll never populate this
});

export const zEventEntity = zEvent.extend({
  ...zBase.shape,
});

export const zEventResponse = zEventEntity;

export interface Event extends z.infer<typeof zEvent> {}
export interface EventEntity extends z.infer<typeof zEventEntity> {}
export interface EventResponse extends z.infer<typeof zEventResponse> {}

export default zEvent;
