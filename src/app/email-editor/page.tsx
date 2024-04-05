'use client';
import EmailEditor from '@/components/EmailEditor';

export default function EmailEditorPage() {
  return (
    <EmailEditor
      onChange={function (): void {}}
      formData={{ subject: '', emailbody: '' }}
    />
  );
}
