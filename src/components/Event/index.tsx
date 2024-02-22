import VolunteerList from '@/app/components/VolunteerList';
import { EventResponse } from '@/types/dataModel/event';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface EventProps {
    event: EventResponse;
    volunteers: VolunteerResponse[]
}

export default function EventComponent ({
    event,
    volunteers,
}: EventProps): React.ReactElement {
    // display the events name, description (if it exists), eventLocation, startAt - endAt, date, eventRoles, also include the volunteerList component
     return (
        <Box>
            <Typography variant="h1">{event.name}</Typography> 
            <Typography variant="h5">{event.description}</Typography>
            <Typography variant="h5">{event.eventLocation}</Typography>
            <Typography variant="h5">{event.startAt.toString()} - {event.endAt.toString()}</Typography>
            {event.date && <Typography variant="h5">{event.date.toString()}</Typography>}
            <Typography variant="h5">{event.eventRoles}</Typography>
            <VolunteerList volunteerResponses={volunteers} /> 

        </Box>
    )
}