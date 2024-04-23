'use client';
import React, { useState } from 'react';
import { EmailFormData } from '@/types/forms/email';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';

interface EmailEditorProps {
  formData: EmailFormData;
  event: EventResponse;
  volunteers: EventVolunteerResponse[];
}

export default function EmailEditor({
  formData,
  event,
  volunteers,
}: EmailEditorProps): React.ReactElement {
  event;
  volunteers;
  const onChange: (formData: EmailFormData) => void = () => {};

  const [value, setValue] = useState(formData.emailbody);
  const [subject, setSubject] = useState(formData.subject);

  // number of volunteers of type EventVolunteerResponse[]
  //const numVolunteers = volunteers.length;

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    onChange({ ...formData, subject: e.target.value });
  };

  const handleBodyChange = (value: string) => {
    setValue(value);
    onChange({ ...formData, emailbody: value });
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSendEmail = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      // Logic to send the email
    } else {
      // Logic if user cancels sending the email
    }
    setShowConfirmation(false);
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

      {showConfirmation && (
        <div>
          Are you sure you want to send this email?
          <Button onClick={() => handleConfirmation(true)}>Yes</Button>
          <Button onClick={() => handleConfirmation(false)}>No</Button>
        </div>
      )}
    </div>
  );
}
