import { Typography } from '@mui/material';
import { handleBackgroundCheckWebhook } from '@/server/actions/handleBackgroundCheckWebhook ';
export default async function Home() {
  const exampleBackgroundCheckWebhookPayload = {
    data: {
      employee_email: 'sophie.nguyen@example.com',
      overall_status: 'FAILED',
    },
    event_type: 'background_check_completed',
  };
  handleBackgroundCheckWebhook(exampleBackgroundCheckWebhookPayload);
  return <Typography variant="h3">Home Page</Typography>;
}
