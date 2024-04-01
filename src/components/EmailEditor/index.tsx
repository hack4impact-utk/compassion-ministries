import React, { useState } from 'react';
import { EmailFormData } from '@/types/forms/email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextField } from '@mui/material';

interface EmailEditorProps {
  onChange: (formData: EmailFormData) => void;
  formData: EmailFormData;
}

export default function EmailEditor({
  onChange,
  formData,
}: EmailEditorProps): React.ReactElement {
  const [value, setValue] = useState(formData.emailbody);
  const [subject, setSubject] = useState(formData.subject);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    onChange({ ...formData, subject: e.target.value });
  };

  const handleBodyChange = (value: string) => {
    setValue(value);
    onChange({ ...formData, emailbody: value });
  };

  return (
    <div>
      <TextField
        label="Subject"
        value={subject}
        onChange={handleSubjectChange}
        fullWidth
      />

      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleBodyChange}
        style={{ height: '400px' }} // Increase the height here
      />
    </div>
  );
}
