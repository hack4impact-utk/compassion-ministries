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

/* Same as zEventEntity when isRecurring is false
 * Adds 'recurrence' and 'recurringEventId' if its true
 */
export const zEventResponse = z.discriminatedUnion('isRecurring', [
  zEventEntity.extend({ recurrence: z.string(), recurringEventId: zObjectId }),
  zEventEntity.extend({ ...zBase.shape }),
]);

/* This is a union between two types.
 * If the event is a recurring event, it will not have a date property, but it will have a recurrence property
 * If the event is not a recurring event, it will have a date property, but will not have a recurrence property
 */
export const zCreateEventRequest = z.discriminatedUnion('isRecurring', [
  zEvent
    .omit({ parentEvent: true, date: true })
    .extend({ isRecurring: z.literal(true), recurrence: z.string() }),
  zEvent.omit({ parentEvent: true }).extend({ isRecurring: z.literal(false) }),
]);

export interface Event extends z.infer<typeof zEvent> {}
export interface EventEntity extends z.infer<typeof zEventEntity> {}
export type EventResponse = z.infer<typeof zEventResponse>;
export type CreateEventRequest = z.infer<typeof zCreateEventRequest>; // needs to be a type to support discriminated union

export default zEvent;
