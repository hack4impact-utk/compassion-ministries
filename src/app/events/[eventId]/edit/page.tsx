import { getEvent } from '@/server/actions/Event';

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
}
