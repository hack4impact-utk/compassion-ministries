import EmailEditor from '@/components/EmailEditor';
import { getAllVolunteersForEvent, getEvent } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import React from 'react';

export default async function EmailEditorPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventResponse = JSON.parse(
    JSON.stringify(await getEvent(params.eventId))
  );
  const vols: EventVolunteerResponse[] = JSON.parse(
    JSON.stringify(await getAllVolunteersForEvent(params.eventId))
  );

  return (
    <EmailEditor
      formData={{ subject: '', emailbody: '' }}
      event={event}
      volunteers={vols}
    />
  );
}
