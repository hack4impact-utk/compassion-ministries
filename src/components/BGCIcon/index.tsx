import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { ReactNode } from 'react';
import { BackgroundCheckStatus } from '@/types/dataModel/volunteer';

const iconSize: string = '30px';

interface BGCIconProps {
  backgroundCheckStatuses: BackgroundCheckStatus[];
}

export default function BGCIcon({ backgroundCheckStatuses }: BGCIconProps) {
  return getBGCIcons(backgroundCheckStatuses);
}

// SVG icons for each event Background Check Status
export const BGCIcons: { [id: string]: ReactNode } = {
  Passed: (
    <CheckCircleIcon
      sx={{ color: 'chartreuse', fontSize: iconSize }}
      key="Passed Icon"
    />
  ),
  Failed: (
    <CancelIcon
      sx={{ color: 'red', fontSize: iconSize }}
      key="Cancelled Icon"
    />
  ),
  'In Progress': (
    <PendingIcon
      sx={{ color: 'gold', fontSize: iconSize }}
      key="In Progress Icon"
    />
  ),
};

function getBGCIcon(status: string | BackgroundCheckStatus): ReactNode {
  return BGCIcons[status];
}

function getBGCIcons(
  statusList: string[] | BackgroundCheckStatus[]
): ReactNode[] {
  return statusList.map((status) => getBGCIcon(status));
}
