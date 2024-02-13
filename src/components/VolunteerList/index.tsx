// Volunteer List 

import { List } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerItemListItem from './VolunteerListItem';

interface VolunteerResponseProps {
    VolunteerResponses: VolunteerResponse[];
}

export default function VolunteerItemList({ 
    VolunteerResponses 
}: VolunteerResponseProps) {
    const [rows, setRows] = React.useState<VolunteerResponse[]>(VolunteerResponses);
    
    // for each volunteerresponse object in the prop array, render a volunteerlistitem component
    return (
        <List>
            {rows.map((volunteer) => (
                <VolunteerItemListItem
                    key={volunteer.email}
                    email={volunteer.email}
                    first_name={volunteer.first_name}
                    second_name={volunteer.second_name}
                    role={volunteer.role}
                />
            ))}
        </List>
    );
}
