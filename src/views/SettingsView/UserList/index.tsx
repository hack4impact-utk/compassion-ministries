import { UserResponse } from '@/types/dataModel/user';
import { sortByPath } from '@/utils/sorting';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

interface UserListProps {
  users: UserResponse[];
  secondaryAction?: React.ReactNode;
}

export default function UserList({ users, secondaryAction }: UserListProps) {
  return (
    <List>
      {/* Sorted by name */}
      {sortByPath<UserResponse>(users, 'name').map((user) => (
        <ListItem key={user._id} secondaryAction={secondaryAction}>
          <ListItemAvatar>
            <Avatar src={user.image || ''} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
}
