import { EventResponse } from '@/types/dataModel/event';
import EventList from './components/EventList';
import { Box } from '@mui/material';

const eventResponses: EventResponse[] = [
  {
    name: 'Event 1',
    description: 'Description of Event 1.',
    startAt: new Date(2024, 2, 1),
    endAt: new Date(2024, 2, 2),
    eventRoles: ['Food', 'Medical', 'Dental', 'Save the Babies'],
    isRecurring: false,
    parentEvent: '',
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 2),
    _id: '0',
  },
  {
    name: 'Event 2',
    description: "Event 2's description!",
    startAt: new Date(2024, 4),
    endAt: new Date(2024, 5),
    eventRoles: ['Food'],
    isRecurring: false,
    parentEvent: '',
    createdAt: new Date(2024, 1),
    updatedAt: new Date(2024, 2),
    _id: '0',
  },
];

export default function Home() {
  return (
    <Box>
      <h1>Home Page</h1>
      <h2>Example events:</h2>
      <EventList eventResponses={eventResponses} />
    </Box>
  );
}
