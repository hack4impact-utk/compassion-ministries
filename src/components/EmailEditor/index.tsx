'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, TextField } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { EmailFormData } from '@/types/forms/email';
import useSnackbar from '@/hooks/useSnackbar';
import { useConfirm } from 'material-ui-confirm';

interface EmailEditorProps {
  event: EventResponse;
  volunteers: EventVolunteerResponse[];
}

export default function EmailEditor({
  event,
  volunteers,
}: EmailEditorProps): React.ReactElement {
  const numVols = volunteers.length;
  const [formData, setFormData] = useState<EmailFormData>({
    subject: '',
    emailbody: '',
  });

  const { showSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [value, setValue] = useState(formData.emailbody);
  const [subject, setSubject] = useState(formData.subject);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setFormData({ ...formData, subject: e.target.value });
  };

  const handleBodyChange = (value: string) => {
    setValue(value);
    setFormData({ ...formData, emailbody: value });
  };

  const handleSendEmail = async () => {
    try {
      await confirm({
        title: 'Are you sure?',
        description: `You are about to send an email to ${numVols} volunteers.`,
        confirmationText: 'Yes',
        cancellationText: 'No',
      });
    } catch {
      return;
    }

    try {
      const res = await fetch(`/api/events/${event._id}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(data.message, 'error');
        return;
      }

      showSnackbar('Email sent successfully!', 'success');
    } catch (error) {
      console.error(error);
      showSnackbar('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <Box>
      {/* Text field for subject */}
      <TextField
        label="Subject"
        value={subject}
        onChange={handleSubjectChange}
        fullWidth
      />

      {/* Rich text editor for email body */}
      <Box sx={{ height: '200px', mb: 4 }}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleBodyChange}
          style={{ height: '100%' }}
        />
      </Box>

      {/* Button to send email */}
      <Button
        variant="contained"
        fullWidth
        sx={{ my: 2 }}
        onClick={handleSendEmail}
      >
        Send Email
      </Button>
    </Box>
  );
}
