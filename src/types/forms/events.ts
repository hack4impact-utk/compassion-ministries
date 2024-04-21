import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const zTime = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
  message: 'Invalid time format',
});

const zDayJs = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

export const zEventFormData = z
  .object({
    name: z.string().nonempty('Required'),
    description: z.string().optional(),
    eventLocation: z.string().optional(),
    date: zDayJs,
    startAt: zTime,
    endAt: zTime,
    eventRoles: z.array(zRole, {
      required_error: 'At least one role is required',
    }),
  })
  .refine(
    (data) => {
      if (data.startAt >= data.endAt) {
        return false;
      }

      return true;
    },
    {
      path: ['startAt'],
      message: 'Start time must be before end time',
    }
  );

export interface EventFormData extends z.infer<typeof zEventFormData> {}
