import EmailEditor from '@/components/EmailEditor';
import { getAllVolunteersForEvent, getEvent } from '@/server/actions/Event';

export default async function EmailEditorPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
  const eventVolunteers = await getAllVolunteersForEvent(params.eventId);

  return (
    <EmailEditor
      onChange={function (): void {}}
      formData={{ subject: '', emailbody: '' }}
      event={event}
      volunteers={eventVolunteers}
    />
  );
}
