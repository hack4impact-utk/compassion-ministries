import EmailEditor from '@/components/EmailEditor';
import React from 'react';

export default async function EmailEditorPage({
  params,
}: {
  params: { eventId: string };
}) {
  return (
    <EmailEditor
      formData={{ subject: '', emailbody: '' }}
      eventId={params.eventId}
    />
  );
}
