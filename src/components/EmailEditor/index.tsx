'use client';
import React, { useState } from 'react';
import { EmailFormData } from '@/types/forms/email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';

interface EmailEditorProps {
  onChange: (formData: EmailFormData) => void;
  formData: EmailFormData;
  event: EventResponse;
  volunteers: EventVolunteerResponse[];
}

export default function EmailEditor({
  onChange,
  formData,
  //event,
  volunteers,
}: EmailEditorProps): React.ReactElement {
  const [value, setValue] = useState(formData.emailbody);
  const [subject, setSubject] = useState(formData.subject);

  // number of volunteers of time EventVolunteerResponse[]
  const numVolunteers = volunteers.length;

  const handleSendEmail = () => {
    // console log the amount of volunteers that will receive en email
    console.log(`Sending email to ${numVolunteers} volunteers`);
  };

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
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleSendEmail}
      >
        Send Email
      </Button>
    </div>
  );
}
