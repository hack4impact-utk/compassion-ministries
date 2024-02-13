import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

interface VolunteerListItemProps {
    name: string;
    email: string;
    phone: string;
}

export default function VolunteerListItem ({
    
}: VolunteerListItemProps) {
    return (
        <ListItem>
            <ListItemText primary="Placeholder" />
        </ListItem>
    )
}