'use client';
import React, {useState} from 'react';
// import * as React from 'react';
import { Tab, Tabs } from '@mui/material';
import { getEventsBetweenDates } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import EventsView from '@/views/EventsView';
import dayjs from 'dayjs';

const sortEventsByDateAsc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
  });
};

const sortEventsByDateDesc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
};

export default async function EventsPage() {
  const today = dayjs().startOf('day').toDate();
  const startOfYear = dayjs().startOf('year').toDate();
  const endOfYear = dayjs().endOf('year').toDate();

  try {
    const events = await getEventsBetweenDates(startOfYear, endOfYear);
    
    if (!events || events.length === 0) {
      return <div>No events available</div>;
    }

    let upcomingEvents: EventResponse[];
    let pastEvents: EventResponse[];

    const eventsBeforeToday = events.filter(event => dayjs(event.date).isBefore(today));
    const eventsTodayAndAfter = events.filter(event => dayjs(event.date).isSame(today, 'day') || dayjs(event.date).isAfter(today));
        
    upcomingEvents = sortEventsByDateAsc(eventsTodayAndAfter);
    pastEvents = sortEventsByDateDesc(eventsBeforeToday);

    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    };

    return (
      <>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Upcoming Events" />
          <Tab label="Past Events" />
        </Tabs>
        {tabIndex === 0 && (
          <EventsView events={upcomingEvents} />
        )}
        {tabIndex === 1 && (
          <EventsView events={pastEvents} />
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return <div>Error fetching events: {error.message}. Please try again later.</div>;
  }
}
