import React from 'react';
import { EmailFormData } from '@/types/forms/email';
import ReactQuill from 'react-quill';
import { TextField } from '@mui/material';

interface EmailEditorProps {
  onChange: (formData: EmailFormData) => void;
  formData: EmailFormData;
}

export default function EmailEditor({
  onChange,
  formData,
}: EmailEditorProps): React.ReactElement {
  return (
    <div>
      <TextField
        label="Subject"
        value={formData.subject}
        onChange={(e) => onChange({ ...formData, subject: e.target.value })}
        fullWidth
      />

      <ReactQuill
        value={formData.emailbody}
        onChange={(value) => onChange({ ...formData, emailbody: value })}
      />
    </div>
  );
}
