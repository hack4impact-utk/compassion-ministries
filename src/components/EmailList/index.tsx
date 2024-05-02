import { Email } from '@/types/dataModel/event';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
          <Accordion
            key={email.sentDate.toDateString()}
            defaultExpanded={emails.length === 1}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{email.subject ?? '(No subject)'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Sent On: {email.sentDate.toDateString()}
                </Typography>
                <Typography>{email.body}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
