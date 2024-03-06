import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { ReactNode } from 'react';
import { Role } from '@/types/dataModel/roles';
import { sortRoles } from '@/utils/role';

interface IconListProps {
  roles: Role[];
}

export default function IconList({ roles }: IconListProps) {
  return getRoleIcons(sortRoles(roles));
}

// SVG icons for each event role
export const roleIcons: { [id: string]: ReactNode } = {
  Food: <LocalDiningIcon sx={{ color: '#F5A81C' }} key="Food Icon" />,
  Medical: <LocalHospitalIcon sx={{ color: 'red' }} key="Medical Icon" />,
  Dental: <MasksIcon sx={{ color: 'skyblue' }} key="Dental Icon" />,
  'Save the Babies': (
    <ChildFriendlyIcon sx={{ color: 'lightgray' }} key="Save the Babies Icon" />
  ),
};

// Gets a role icon for the given role
function getRoleIcon(role: string | Role): ReactNode {
  return roleIcons[role];
}

// Gets a list of role icons for all roles in roleList, preserving order
function getRoleIcons(roleList: string[] | Role[]): ReactNode[] {
  return roleList.map((role) => getRoleIcon(role));
}
