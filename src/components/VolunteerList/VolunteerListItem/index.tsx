import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

interface VolunteerResponseProps {
    volunteers: VolunteerResponse[];
    first_name: string;
    second_name: string;
    email: string;
    role: string;
}

export default function VolunteerItemListItem({
    email,
    first_name,
    second_name,
    role,
}: VolunteerResponseProps) {
    const fullname = first_name + ' ' + second_name;

    // Display the volunteers full name, email (under the name), and role (bottom right of the component)
    return (
        <ListItem alignItems="flex-start" divider>
            <ListItemText primary={fullname} secondary={email} />
            <ListItemText secondary={role} />
        </ListItem>

    );
}