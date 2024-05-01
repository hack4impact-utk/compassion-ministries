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
          <Accordion key={email.subject} defaultExpanded={emails.length == 1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
