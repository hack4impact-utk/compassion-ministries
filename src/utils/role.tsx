import { Role, roles } from '@/types/dataModel/roles';

// Gets a list containing the same roles but in the order as defined by the data model
export function sortRoles(roleList: Role[]): Role[] {
  return [...roleList].sort((a, b) => roles.indexOf(a) - roles.indexOf(b));
}
