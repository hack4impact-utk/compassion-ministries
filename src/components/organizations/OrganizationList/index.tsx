import { OrganizationResponse } from '@/types/dataModel/organization';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

// Returns a List containing a ListItem containing a text component with the name of the
// Organization for each provided Organization
export default function OrganizationList({
  organizations,
}: {
  organizations: OrganizationResponse[];
}) {
  const router = useRouter();
  return (
    <List>
      {organizations.map((organization) => (
        <ListItemButton
          key={organization._id}
          onClick={() => router.push(`/organizations/${organization._id}`)}
        >
          <ListItemText
            primary={organization.name}
            primaryTypographyProps={{ variant: 'h5' }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
