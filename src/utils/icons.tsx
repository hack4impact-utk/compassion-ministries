import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { ReactNode } from 'react';

export const roleIcons: { [id: string]: ReactNode } = {
  ['Food']: <LocalDiningIcon />,
  ['Medical']: <LocalHospitalIcon />,
};
