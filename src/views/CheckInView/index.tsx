'use client';
import CheckInForm from '@/components/CheckInForm';
import LoadingButton from '@/components/LoadingButton';
import useEditConfirmation from '@/hooks/useEditConfirmation';
import useRoleConfirmation from '@/hooks/useRoleConfirmation';
import useSnackbar from '@/hooks/useSnackbar';
import useValidation from '@/hooks/useValidation';
import type { EventResponse } from '@/types/dataModel/event';
import type { OrganizationResponse } from '@/types/dataModel/organization';
import type {
  CreateVolunteerRequest,
  UpdateVolunteerRequest,
  VolunteerResponse,
} from '@/types/dataModel/volunteer';
import { CheckInFormData, zCheckInFormData } from '@/types/forms/checkIn';
import { getChanges } from '@/utils/change';
import { transformCheckInFormDataToCreateEventVolunteerRequest } from '@/utils/transformers/check-in';
import { ValidationErrors } from '@/utils/validation';
import { Button, ButtonGroup, Menu, MenuItem, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowDropDownIcon } from '@mui/x-date-pickers/icons';

interface CheckInViewProps {
  event: EventResponse;
  volunteers: VolunteerResponse[];
  organizations: OrganizationResponse[];
}

export default function CheckInView(props: CheckInViewProps) {
  const [formData, setFormData] = useState<CheckInFormData>({
    role:
      props.event.eventRoles.length === 1 ? props.event.eventRoles[0] : null,
  } as CheckInFormData);
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<CheckInFormData> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [checkInButtonAnchorEl, setCheckInButtonAnchorEl] =
    useState<null | HTMLElement>(null);
  const checkInButtonMenuOpen = !!checkInButtonAnchorEl;
  const confirmRole = useRoleConfirmation();
  const confirmEdit = useEditConfirmation();
  const { showSnackbar } = useSnackbar();
  const validate = useValidation(zCheckInFormData);
  const router = useRouter();

  /*
    This function is responsible for calling the check in api endpoint and
    getting volunteer checked in on the backend.
    It handles three cases:
    1. The volunteer is new
    2. The volunteer is already in the system and has been edited
    3. The volunteer is already in the system and has not been edited

    In the first case, the volunteer is created and passed to the api as the `volunteer` field
    In the second and third cases, the `volunteer` field is the object ID of the vol
    In the third case, the `updatedVolunteer` field is the updated volunteer object
  */
  const onCheckIn = async (multiCheckIn?: boolean) => {
    setLoading(true);
    // Validate the form
    const validationResult = validate(formData);
    if (validationResult) {
      setValidationErrors(validationResult);
      setLoading(false);
      return;
    }

    // Clear validation errors
    setValidationErrors(undefined);

    // find volunteer by email or set volunteer to new volunteer req
    const foundVolunteer = props.volunteers.find(
      (v) => v._id === formData.volunteerId
    );
    const constructedVol = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
      address: formData.address,
    };
    let volunteer: string | CreateVolunteerRequest = constructedVol;
    let updatedVolunteer: UpdateVolunteerRequest | undefined = undefined;

    let isEdited = false;

    if (!foundVolunteer) {
      // create a new volunteer to check in
      volunteer = constructedVol;
    } else {
      volunteer = foundVolunteer._id;
      // check if there are changes
      const changes = getChanges(foundVolunteer, constructedVol);
      isEdited = Object.keys(changes).length > 0;
      if (isEdited) {
        // there are changes, edit volunteer
        const confirmed = await confirmEdit('volunteer', changes);
        if (!confirmed) {
          setLoading(false);
          return;
        }
        updatedVolunteer = constructedVol;
      }
    }

    let verifier: string | null = null;

    // if:
    // - role is not food
    // - new volunteer or volunteer does not have a role verification for the role
    // then confirm the role
    if (
      formData.role !== 'Food' &&
      (typeof volunteer === 'object' ||
        !foundVolunteer?.roleVerifications?.find(
          (rv) => rv.role === formData.role
        ))
    ) {
      verifier = await confirmRole(formData.role);
      // return if not confirmed
      if (!verifier) {
        setLoading(false);
        return;
      }
    }

    const eventVolReq = transformCheckInFormDataToCreateEventVolunteerRequest(
      formData,
      volunteer,
      props.event,
      verifier || undefined,
      isEdited,
      updatedVolunteer
    );

    // make post req
    try {
      const res = await fetch(`/api/events/${props.event._id}/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventVolReq),
      });

      if (res.status !== 201) {
        // handle duplicate entry, we don't want to display duplicate message
        // to the user
        if (res.status === 409) {
          setFormData({
            role:
              props.event.eventRoles.length === 1
                ? props.event.eventRoles[0]
                : null,
          } as CheckInFormData);
          showSnackbar('Volunteer already checked in', 'error');
          setLoading(false);
          return;
        }
        const data = await res.json();
        showSnackbar(data.message, 'error');
        setLoading(false);
        return;
      }
      // reset form
      if (multiCheckIn) {
        // add volutneer family member on next check-in -- copies over email/phone/address/role/org when clearing form
        setFormData({
          address: formData.address,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          organization: formData.organization,
          role: formData.role,
        } as CheckInFormData);
        setCheckInButtonAnchorEl(null);
      } else {
        setFormData({
          role:
            props.event.eventRoles.length === 1
              ? props.event.eventRoles[0]
              : null,
        } as CheckInFormData);
      }

      showSnackbar('Checked in successfully', 'success');
      router.refresh();
      setLoading(false);
    } catch (e) {
      showSnackbar('Failed to check in', 'error');
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">Check in for {props.event.name}</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <CheckInForm
          checkInData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
          event={props.event}
          volunteers={props.volunteers}
          organizations={props.organizations}
          errors={validationErrors}
          setSubmitDisabled={setSubmitDisabled}
        />
      </Grid2>
      <Grid2 xs={12}>
        <ButtonGroup variant="contained" fullWidth>
          <LoadingButton
            buttonProps={{
              fullWidth: true,
              onClick: () => onCheckIn(),
              disabled: submitDisabled,
            }}
            loading={loading}
            loadingSize={24}
          >
            Check in
          </LoadingButton>
          <Button
            size="small"
            sx={{ width: '2.5%' }}
            onClick={(e) => setCheckInButtonAnchorEl(e.currentTarget)}
          >
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={checkInButtonAnchorEl}
            open={checkInButtonMenuOpen}
            onClose={() => setCheckInButtonAnchorEl(null)}
          >
            {/* Prepopulates the next checkin form with all info except name. Used for family members that share info */}
            <MenuItem onClick={() => onCheckIn(true)}>
              Check in volunteer and add family member
            </MenuItem>
          </Menu>
        </ButtonGroup>
      </Grid2>
    </Grid2>
  );
}
