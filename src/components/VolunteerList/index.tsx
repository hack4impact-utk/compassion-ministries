import React from 'react';
import  { List, ListItem, ListItemText }  from '@mui/material';
import VolunteerResponse from '@/types/dataModel/volunteer'


interface VolunteerListProps {
    VolunteerResponse: typeof VolunteerResponse[];
}

export default function VolunteerLlist ({ 
    VolunteerResponse
}: VolunteerListProps) {
    VolunteerResponse;
    return (
        <List>
            <ListItem> 
            <ListItemText primary="Placeholder" />  
            </ListItem>
        </List>
    )
}