import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import { Dayjs } from 'dayjs';

export const zEventFormData = z.object({
  name: z.string(),
  description: z.string().optional(),
  eventLocation: z.string().optional(),
  startAt: z.instanceof(Dayjs),
  endAt: z.instanceof(Dayjs),
  date: z.instanceof(Dayjs),
  eventRoles: z.array(zRole),
});

export interface EventFormData extends z.infer<typeof zEventFormData> {}
