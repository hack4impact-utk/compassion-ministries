import { z } from 'zod';
import zEvent, { zEventResponse } from './event';
import zBase, { zObjectId } from './base';

const zRecurringEvent = z.object({
  event: zEvent,
  recurrence: z.string(),
});

export const zRecurringEventEntity = zRecurringEvent.extend({
  ...zBase.shape,
  event: zObjectId,
});

export const zRecurringEventResponse = zRecurringEventEntity.extend({
  event: zEventResponse,
});

export default zRecurringEvent;
