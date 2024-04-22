import { UserResponse } from '@/types/dataModel/user';
import { Clear } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

interface UserListProps {
  users: UserResponse[];
  onRemove: (userId: string) => void;
}

export default function UserList({ users, onRemove }: UserListProps) {
  return (
    <List>
      {users.map((user) => (
        <ListItem
          key={user._id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              size="small"
              onClick={() => onRemove(user._id)}
            >
              <Clear fontSize="small" />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar src={user.image || ''} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
}
