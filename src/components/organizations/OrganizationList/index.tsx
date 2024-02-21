import { OrganizationResponse } from '@/types/dataModel/organization';
import { List, ListItem, ListItemText } from '@mui/material';

export default function OrganizationList({
  organizationResponses,
}: {
  organizationResponses: OrganizationResponse[];
}) {
  return (
    <List>
      {organizationResponses.map((organizationResponse) => (
        <ListItem key={organizationResponse._id}>
          <ListItemText primary={organizationResponse.name} />
        </ListItem>
      ))}
    </List>
  );
}
