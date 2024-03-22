import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const zDayJs = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

export const zEventFormData = z.object({
  name: z.string().nonempty('Required'),
  description: z.string().optional(),
  eventLocation: z.string().optional(),
  startAt: zDayJs,
  endAt: zDayJs,
  date: zDayJs,
  eventRoles: z.array(zRole, {
    required_error: 'At least one role is required',
  }),
});

export interface EventFormData extends z.infer<typeof zEventFormData> {}
