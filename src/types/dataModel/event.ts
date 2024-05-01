import { z } from 'zod';
import { zRole } from './roles';
import zBase, { zObjectId } from './base';
import { EmailFormData } from '../forms/email';

const zEmail = z.object({
  subject: z.string().optional(),
  body: z.string().min(1, "Required"),
  sentDate: z.date(),
})

const zEvent = z.object({
  name: z.string(),
  description: z.string().optional(),
  eventLocation: z.string().optional(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  date: z.coerce.date().optional(),
  eventRoles: z.array(zRole),
  emails: z.array(zEmail).optional(),
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
  zEventEntity.extend({
    isRecurring: z.literal(true),
    recurrence: z.string(),
    recurringEventId: zObjectId,
    ...zBase.shape,
  }),
  zEventEntity.extend({ isRecurring: z.literal(false), ...zBase.shape }),
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

export const zCreateEmailRequest = EmailFormData.extend({});

export interface Email extends z.infer<typeof zEmail> { }
export interface Event extends z.infer<typeof zEvent> { }
export interface EventEntity extends z.infer<typeof zEventEntity> { }
export type EventResponse = z.infer<typeof zEventResponse>;
export type CreateEventRequest = z.infer<typeof zCreateEventRequest>; // needs to be a type to support discriminated union

export type CreateEmailRequest = z.infer<typeof zCreateEmailRequest>;

export default zEvent;
