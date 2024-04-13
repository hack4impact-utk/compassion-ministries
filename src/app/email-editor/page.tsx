import EmailEditor from '@/components/EmailEditor';
import React from 'react';

export default async function EmailEditorPage({}) {
  return <EmailEditor formData={{ subject: '', emailbody: '' }} />;
}
