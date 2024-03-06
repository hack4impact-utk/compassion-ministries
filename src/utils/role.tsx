import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { ReactNode } from 'react';
import { Role, roles } from '@/types/dataModel/roles';

// SVG icons for each event role
export const roleIcons: { [id: string]: ReactNode } = {
  Food: <LocalDiningIcon sx={{ color: '#F5A81C' }} key="Food Icon" />,
  Medical: <LocalHospitalIcon sx={{ color: 'red' }} key="Medical Icon" />,
  Dental: <MasksIcon sx={{ color: 'skyblue' }} key="Dental Icon" />,
  'Save the Babies': (
    <ChildFriendlyIcon sx={{ color: 'lightgray' }} key="Save the Babies Icon" />
  ),
};

// Gets a list containing the same roles but in the order as defined by the data model
export function sortRoles(roleList: Role[]): Role[] {
  return [...roleList].sort((a, b) => roles.indexOf(a) - roles.indexOf(b));
}

// Gets a role icon for the given role
export function getRoleIcon(role: string | Role): ReactNode {
  return roleIcons[role];
}

// Gets a list of role icons for all roles in roleList, preserving order
export function getRoleIcons(roleList: string[] | Role[]): ReactNode[] {
  return roleList.map((role) => getRoleIcon(role));
}
