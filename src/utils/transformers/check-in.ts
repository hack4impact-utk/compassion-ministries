import { EventResponse } from '@/types/dataModel/event';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import {
  CreateVolunteerRequest,
  UpdateVolunteerRequest,
} from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';

export function transformCheckInFormDataToCreateEventVolunteerRequest(
  formData: CheckInFormData,
  volunteer: string | CreateVolunteerRequest,
  event: EventResponse,
  verifier: string | undefined,
  isEdited: boolean = false,
  updatedVolunteer?: UpdateVolunteerRequest
): CreateEventVolunteerRequest {
// if an existing volunteer's information was changed during checkin
  if (isEdited) {
    if (!updatedVolunteer) {
      throw new Error('updatedVolunteer is required when isEdited is true');
    }
    if (typeof volunteer === 'object') {
      throw new Error('volunteer must be an id when isEdited is true');
    }
    return {
      volunteer,
      event: event._id,
      role: formData.role,
      organization: formData.organization?._id,
      verifier: verifier,
      isEdited,
      updatedVolunteer,
    };
  } else {
    return {
      volunteer,
      event: event._id,
      role: formData.role,
      organization: formData.organization?._id,
      verifier: verifier,
      isEdited,
    };
  }
}
