import { z } from 'zod';

const zBackgroundCheckWebhookPayload = z.object({
  data: z.object({
    employee_email: z.string(),
    overall_status: z.string(),
  }),
  event_type: z.string(),
});

export interface BackgroundCheckWebhookPayload
  extends z.infer<typeof zBackgroundCheckWebhookPayload> {}

export default zBackgroundCheckWebhookPayload;
f;
