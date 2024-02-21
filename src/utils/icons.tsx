import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { ReactNode } from 'react';

// SVG icons for each event role
export const roleIcons: { [id: string]: ReactNode } = {
  Food: <LocalDiningIcon sx={{ color: '#F5A81C' }} />,
  Medical: <LocalHospitalIcon sx={{ color: 'red' }} />,
  Dental: <MasksIcon sx={{ color: 'lightblue' }} />,
  'Save the Babies': <ChildFriendlyIcon sx={{ color: 'lightgray' }} />,
};
