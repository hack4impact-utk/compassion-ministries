'use client';
import React, { useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import {
  Typography,
  Box,
  ListItemButton,
  ListItemText,
  Button,
  ButtonBase,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';
import RoleIconList from '@/components/RoleIconList';
import { useRouter } from 'next/navigation';
import AddRoleVerificationDialog from '@/components/AddRoleVerificationDialog';
import { formatPhoneNumber } from '@/utils/phone-number';
import useResponsive from '@/hooks/useResponsive';
import { useConfirm } from 'material-ui-confirm';
import useSnackbar from '@/hooks/useSnackbar';
import { useSession } from 'next-auth/react';
import BGCIcon from '@/components/BGCIcon';
import VolunteerReporting from '../VolunteerReporting';
import LoadingButton from '@/components/LoadingButton';
import { VolunteerReportResponse } from '@/server/actions/Reporting';
import { sortByPath } from '@/utils/sorting';
// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
  events: VolunteerEventResponse[];
}

// VolunteerInfo displays volunteer information
export default function Volunteer({
  volunteer,
  events,
}: VolunteerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<VolunteerReportResponse | null>(null);
  const confirm = useConfirm();
  const { showSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const isAdmin = session?.user?.isAdmin;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onLoadReporting() {
    setLoading(true);
    const res = await fetch(`/api/volunteers/${volunteer._id}/report`);
    const response = await res.json();

    setReport(response);

    setLoading(false);
  }

  const handleSubmit = async (formData: UpsertRoleVerificationFormData) => {
    try {
      const res = await fetch(
        `/api/volunteers/${volunteer._id}/verifications`,
        {
          method: 'PATCH',
          body: JSON.stringify(formData),
        }
      );
      if (res.status == 204) {
        handleClose();
      } else {
        const data = await res.json();
        console.error('Failed to add verification', data);
      }
    } catch (error) {
      console.error('Failed to add verification', error);
    }
  };

  const startBackgroundCheck = async () => {
    const alreadyPassed =
      volunteer.backgroundCheck?.status &&
      volunteer.backgroundCheck?.status === 'Passed';
    const fullName = `${volunteer.firstName} ${volunteer.lastName}`;
    try {
      await confirm({
        title: alreadyPassed
          ? `${fullName} passed a background check on ${volunteer.backgroundCheck?.lastUpdated.toLocaleDateString()}. Are you sure you want to run a new background check?`
          : `Are you sure you want to run a background check on ${fullName}?`,
        description: `This will charge $15 to Compassion Ministries. Type "${fullName}" to confirm`,
        confirmationKeyword: fullName,
        confirmationKeywordTextFieldProps: {
          placeholder: fullName,
        },
      });
    } catch (e) {
      return;
    }

    try {
      const res = await fetch(
        `/api/volunteers/${volunteer._id}/background-check`,
        {
          method: 'POST',
        }
      );
      if (res.status == 204) {
        showSnackbar('Background check started', 'success');
        router.refresh();
      } else if (res.status === 409) {
        showSnackbar('Volunteer already has background check', 'error');
      } else {
        const data = await res.json();
        showSnackbar('Failed to start background check', 'error');
        console.error(data);
      }
    } catch (error) {
      showSnackbar('Failed to start background check', 'error');
      console.error(error);
    }
  };

  const formattedPhoneNumber = formatPhoneNumber(volunteer.phoneNumber);
  const router = useRouter();
  const { isMobile } = useResponsive();
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <Typography variant="h3" pt={2} pb={2}>
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
            {isAdmin && (
              <Button
                variant="outlined"
                fullWidth={isMobile}
                onClick={startBackgroundCheck}
              >
                Run background check
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Email:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {volunteer.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Phone number:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {formattedPhoneNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Address:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {volunteer.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Previous organization:
            </Typography>
            <ButtonBase
              onClick={() =>
                router.push(
                  `/organizations/${volunteer.previousOrganization?._id}`
                )
              }
            >
              <Typography display="inline" variant="h6">
                {volunteer.previousOrganization?.name}
              </Typography>
            </ButtonBase>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }} pt={4}>
            <Typography variant="h5">Role Verifications</Typography>
            <AddIcon sx={{ ml: 1, color: '#808080' }} onClick={handleOpen} />
          </Box>
          {volunteer.roleVerifications?.map((verification, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Role:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {verification.role}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Verified by:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {verification.verifier}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Verification date:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {new Date(verification.lastUpdated).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {volunteer.backgroundCheck && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }} pt={4}>
              <Typography variant="h5">Background check</Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Status:
                </Typography>
                <Typography
                  display="inline"
                  variant="h6"
                  fontWeight="normal"
                  sx={{ mr: 1 }}
                >
                  {volunteer.backgroundCheck?.status}
                </Typography>
                <BGCIcon
                  status={volunteer.backgroundCheck?.status}
                  size="28px"
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Check date:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {new Date(
                    volunteer.backgroundCheck?.lastUpdated
                  ).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Volunteer Reporting */}
        {events.length > 0 && (
          <Box sx={{ pt: 4 }}>
            {report?.num_events ? (
              <VolunteerReporting report={report} volunteer={volunteer} />
            ) : (
              <LoadingButton
                loading={loading}
                onClick={onLoadReporting}
                variant="contained"
                fullWidth={true}
              >
                View volunteer statistics
              </LoadingButton>
            )}
          </Box>
        )}

        {events.length > 0 && (
          <Box>
            <Typography
              sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
              variant="h6"
              mt={4}
            >
              Attended Events
            </Typography>
            {/* Sort events by date */}
            {sortByPath(events, 'event.date').map((volunteerEvent, i) => (
              <ListItemButton
                key={i}
                onClick={() =>
                  router.push(`/events/${volunteerEvent.event._id}`)
                }
                sx={{ pl: 0 }}
              >
                <Box>
                  <RoleIconList roles={[volunteerEvent.role]}></RoleIconList>
                </Box>
                <ListItemText
                  sx={{ pl: 1 }}
                  primary={`${volunteerEvent.event.name}`}
                  primaryTypographyProps={{
                    variant: 'h5',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
              </ListItemButton>
            ))}
          </Box>
        )}
      </Box>
      <AddRoleVerificationDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
