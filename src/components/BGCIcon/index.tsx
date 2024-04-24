import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { BackgroundCheckStatus } from '@/types/dataModel/volunteer';

interface BGCIconProps {
  status: BackgroundCheckStatus;
  size: 'small' | 'medium' | 'large' | string;
}

export default function BGCIcon({ status, size }: BGCIconProps) {
  return BGCIcons(size)[status];
}

// SVG icons for each event Background Check Status
export const BGCIcons = (size: string) => ({
  Passed: <CheckCircleIcon sx={{ fontSize: size }} color="success" />,
  Failed: <CancelIcon sx={{ fontSize: size }} color="error" />,
  'In Progress': <PendingIcon sx={{ fontSize: size }} color="warning" />,
});
