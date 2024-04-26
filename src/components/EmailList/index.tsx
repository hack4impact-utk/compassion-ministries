import { Email } from '@/types/dataModel/event';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

interface EmailListProps {
  emails: Email[];
}

export default function EmailList({
  emails,
}: EmailListProps): React.ReactElement {
  return (
    <Box>
      {emails.map((email) => {
        return (
          <Accordion key={email.subject}>
            <AccordionSummary>
              <Typography>{email.subject}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography>Sent On: {email.sentDate}</Typography>
                <Typography>{email.body}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
