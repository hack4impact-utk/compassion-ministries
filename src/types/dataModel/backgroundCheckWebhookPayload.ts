import { z } from 'zod';

const zBackgroundCheckWebhookPayload = z.object({
  data: z.object({
    employee_email: z.string(),
    overall_status: z.union([z.literal('VERIFIED'), z.literal('FAILED')]),
  }),
  event_type: z.literal('overall_status_update'),
});

export interface BackgroundCheckWebhookPayload
  extends z.infer<typeof zBackgroundCheckWebhookPayload> {}

export default zBackgroundCheckWebhookPayload;
