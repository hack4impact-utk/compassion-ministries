import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { BackgroundCheckStatus } from '@/types/dataModel/volunteer';

const iconSize: string = '30px';

interface BGCIconProps {
  backgroundCheckStatus: BackgroundCheckStatus;
}

export default function BGCIcon({ backgroundCheckStatus }: BGCIconProps) {
  return BGCIcons[backgroundCheckStatus];
}

// SVG icons for each event Background Check Status
export const BGCIcons = {
  Passed: <CheckCircleIcon sx={{ fontSize: iconSize }} color="success" />,
  Failed: <CancelIcon sx={{ fontSize: iconSize }} color="error" />,
  'In Progress': <PendingIcon sx={{ fontSize: iconSize }} color="warning" />,
};
