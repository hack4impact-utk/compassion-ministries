import { ChangeRecord } from '@/utils/change';
import { camelCaseToTitleCase } from '@/utils/string';
import { ArrowForward } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Fragment } from 'react';

interface ConfirmContentProps {
  changed: ChangeRecord;
}

export default function ConfirmContent({ changed }: ConfirmContentProps) {
  return (
    <Grid2 container>
      <Grid2 xs={6}>
        <Typography variant="subtitle1" fontWeight="bold">
          Old value
        </Typography>
      </Grid2>
      <Grid2 xs={6} sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          New value
        </Typography>
      </Grid2>
      {Object.keys(changed).map((key) => {
        const [oldValue, newValue] = changed[key];
        return (
          <Fragment key={key}>
            <Grid2 xs={12} sx={{ mt: 1, mb: -1 }}>
              <Typography variant="subtitle1" color="GrayText">
                {camelCaseToTitleCase(key)}
              </Typography>
            </Grid2>
            <Grid2 xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pr: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="black"
                  sx={{ wordWrap: 'break-word', maxWidth: '70%' }}
                >
                  {oldValue}
                </Typography>
                <ArrowForward />
              </Box>
            </Grid2>
            <Grid2 xs={6}>
              <Typography variant="h6" color="black">
                {newValue}
              </Typography>
            </Grid2>
          </Fragment>
        );
      })}
    </Grid2>
  );
}
