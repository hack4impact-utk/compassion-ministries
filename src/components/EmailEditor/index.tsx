'use client';
import React, { useState } from 'react';
import { EmailFormData } from '@/types/forms/email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField } from '@mui/material';

interface EmailEditorProps {
  formData: EmailFormData;
}

export default function EmailEditor({
  formData,
}: EmailEditorProps): React.ReactElement {
  const onChange: (formData: EmailFormData) => void = () => {};

  const [value, setValue] = useState(formData.emailbody);
  const [subject, setSubject] = useState(formData.subject);

  // number of volunteers of time EventVolunteerResponse[]

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
      {/* Text field for subject */}
      <TextField
        label="Subject"
        value={subject}
        onChange={handleSubjectChange}
        fullWidth
      />

      {/* Rich text editor for email body */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleBodyChange}
        style={{ height: '200px' }} // Increase the height here
      />
      <Button variant="contained" fullWidth sx={{ mb: 2 }}>
        Send Email
      </Button>
    </div>
  );
}
