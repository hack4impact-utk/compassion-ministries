import { OrganizationResponse } from '@/types/dataModel/organization';
import { List, ListItem, ListItemText } from '@mui/material';

// Returns a List containing a ListItem containing a text component with the name of the
// Organization for each provided Organization
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
