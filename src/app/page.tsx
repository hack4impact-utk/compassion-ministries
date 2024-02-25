'use client';
import EventForm from '@/components/EventForm';
import { EventResponse } from '@/types/dataModel/event';
import { EventFormData } from '@/types/forms/events';
import { useEffect, useState } from 'react';

const testEvent: EventResponse = {
  name: 'Test Event',
  description: 'This is a test event',
  eventLocation: 'Test Location',
  startAt: new Date(),
  endAt: new Date(),
  date: new Date(),
  eventRoles: ['Food', 'Medical'],
  isRecurring: false,
  _id: 'testId',
  createdAt: new Date(),
  updatedAt: new Date(),
  parentEvent: 'testParentId',
};

export default function Home() {
  const [eventData, setEventData] = useState<EventFormData>(
    {} as EventFormData
  );

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  return (
    <EventForm
      eventData={eventData}
      onChange={setEventData}
      currentEvent={testEvent}
    />
  );
}
