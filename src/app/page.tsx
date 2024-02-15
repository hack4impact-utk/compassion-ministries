import { EventResponse } from '@/types/dataModel/event';
import EventList from './components/EventList';

const eventResponses: EventResponse[] = [
  {
    name: 'test',
    description: 'desc',
    startAt: new Date(2024, 2, 1),
    endAt: new Date(2024, 2, 2),
    eventRoles: ['Food', 'Medical'],
    isRecurring: false,
    parentEvent: '',
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 2),
    _id: '0',
  },
  {
    name: 'test2',
    description: 'desc2',
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
  return <EventList eventResponses={eventResponses} />;
}
